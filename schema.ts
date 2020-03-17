import { gql } from 'apollo-server-micro'

const schema = gql`

type Country {
  name: String
  results: [Result]
  mostRecent: Result
}

type Result {
  country: Country
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

  countries (names: [String]): [Country]
  country (name: String): Country
}
`

export default schema