import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { buildSchema } from 'type-graphql';
import { customAuthChecker } from './utils/CustomAuthChecker';
import dotenv from 'dotenv';
import UserResolver from './controller/User.resolver';
import BookResolver from './controller/Book.resolver';
import { Book, BookHistory } from './models/Book';
import { Temporalize } from 'sequelize-temporalize';
import BookHistoryResolver from "./controller/BookHistory.resolver";

dotenv.config();
const baseUrl = process.env.GQLPATH || '/graphql';

const main = async () => {
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME || '',
    process.env.DATABASE_USER || '',
    process.env.DATABASE_PASSWORD || '',
    {
      host: process.env.DATABASE_HOST || '',
      port: 5432,
      dialect: 'postgres',
      modelPaths: [`${__dirname}/models`],
    });

  Temporalize({
    model: Book,
    modelHistory: BookHistory,
    sequelize,
    temporalizeOptions: { paranoid: true },
  });

  await sequelize.sync();

  const schema = await buildSchema({
    authChecker: customAuthChecker,
    emitSchemaFile: true,
    resolvers: [UserResolver, BookResolver, BookHistoryResolver],
  });

  const app = express();

  const server = new ApolloServer({
    context: ({ req }: any) => {
      const context = {
        req,
        user: req.user,
      };
      return context;
    },
    introspection: true,
    schema,
  });

  app.use(
    baseUrl,
    expressJwt({
      secret: process.env.CRYPTO_KEY!,
      algorithms: ['HS256'],
      credentialsRequired: false,
    }),
  );

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(
    cors(),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

  await server.start();
  server.applyMiddleware({ app, path: baseUrl });
};

main().then(r => {});
