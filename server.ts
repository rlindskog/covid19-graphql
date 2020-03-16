import { makeExecutableSchema, ApolloServer } from 'apollo-server-micro'
import { default as typeDefs } from './schema'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true
})

export default server.createHandler({ path: '/' })