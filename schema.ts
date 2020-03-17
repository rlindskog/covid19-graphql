import { gql } from 'apollo-server-micro'

const schema = gql`

type Result {
  country: String
  date: String
  confirmed: Int
  deaths: Int
  recovered: Int
}

"""eq - equal to, gt - greater than, lt - less than"""
input DateInput {
  eq: String
  gt: String
  lt: String
}

type Query {
  results(countries: [String], date: DateInput): [Result]
  result (country: String!, date: String): Result
}
`

export default schema