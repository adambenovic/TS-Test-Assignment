import {makeExecutableSchema} from 'graphql-tools'

const RootQuery = `
  type RootQuery {
    hello: String!
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery],
  resolvers: {
    RootQuery: {
      hello: () => 'world',
    }
  }
})

export default schema
