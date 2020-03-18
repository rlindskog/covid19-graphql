import { gql } from 'apollo-server-micro'

const schema = gql`

type Country {
  name: String
  results: [Result]
  mostRecent: Result
}

type Result {
  country: Country

"""format date with date-fns. Help - https://date-fns.org/v2.11.0/docs/format"""
  date (format: String): String
  confirmed: Int
  deaths: Int
  recovered: Int
  growthRate: Float
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