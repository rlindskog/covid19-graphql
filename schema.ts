import { gql } from 'apollo-server-micro'

const schema = gql`

type Result {
  country: String
  date: String
  confirmed: Int
  deaths: Int
  recovered: Int
}

input DateInput {
  eq: String
  gt: String
  lt: String
}

input CountryInput {
  in: [String]
  eq: String
}

type Query {
  results(countries: [String], date: DateInput): [Result]
  result (country: String!, date: String!): Result
}
`

export default schema