import {graphqlHTTP} from 'express-graphql'
import config from '../../config/config.json'
import schema from '../schema'

export default function (server) {
  console.info('SETUP - GraphQL...')

  server.use(config.graphqlEndpoint, graphqlHTTP(() => ({
    schema,
    graphiql: config.graphql.ide,
    pretty: config.graphql.pretty
  })))
}
