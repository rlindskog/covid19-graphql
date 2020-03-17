import { makeExecutableSchema, ApolloServer } from 'apollo-server-micro'
import { default as typeDefs } from './schema'
import resolvers from './resolvers'
import fetch from 'node-fetch'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

let results = null

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context() {
    const getResults = async () => {
      if (results) {
        return results
      }
      const res = await fetch('https://pomber.github.io/covid19/timeseries.json')
      results = await res.json()
      return results
    }
    return {
      getResults
    }
  }
})

export default server.createHandler({ path: '/' })