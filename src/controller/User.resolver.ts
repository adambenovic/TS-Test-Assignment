import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import User from '../models/User';
import AuthInputArgs from '../otherClasses/AuthInputArgs';
import Token from '../otherClasses/Token';
import { IContext, IUserPayLoad, Role } from '../utils/ContextInterface';
import { GraphQLString } from 'graphql';

const expiresIn = '1y';
const userNotFound = 'User not found';
const authError = 'Authentication error - email does not exist or password is incorrect.';

@Resolver(User)
export default class UserResolver {
  @Authorized([Role.USER])
  @Query(() => User)
  public async user (@Ctx() ctx: IContext) {
    if (ctx.user && ctx.user.role === Role.USER) {
      const user = await User.findOne({
        where: { id: ctx.user.id },
      });

      if (!user) {
        throw new Error(userNotFound);
      }

      return user;
    }

    throw new Error(userNotFound);
  }

  @Query(() => User)
  public async userFind (@Arg('email', () => GraphQLString) email: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error(userNotFound);
    }

    return user;
  }

  @Mutation(() => Token)
  public async userSignIn (@Args(() => AuthInputArgs)
    {
      email,
      password,
    }: AuthInputArgs) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error(authError);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error(authError);
    }

    const payload: IUserPayLoad = {
      id: user.id,
      role: Role.USER,
    };

    const token = jsonwebtoken.sign(payload, process.env.CRYPTO_KEY!, {
      expiresIn,
    });

    return { token };
  }

  @Mutation(() => Token)
  public async userSignUp (
    @Args(() => AuthInputArgs)
      { email, password }: AuthInputArgs,
  ) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // @ts-ignore
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const payload: IUserPayLoad = {
      id: newUser.id,
      role: Role.USER,
    };

    const token = jsonwebtoken.sign(payload, process.env.CRYPTO_KEY!, {
      expiresIn,
    });

    return { token };
  }
}
