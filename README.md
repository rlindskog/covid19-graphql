# Covid19 GraphQL API

https://covid19-graphql.now.sh

Data is pulled directly from https://github.com/pomber/covid19, which is a JSON representation of https://github.com/CSSEGISandData/COVID-19. All data is up to date.

Example query
```graphql

query {
  # time series data
  results (countries: ["US", "Canada"], date: { lt: "3/10/2020" }) {
    country {
      name
    }
    date
    confirmed
    deaths
    recovered
  }

  # by country
  country(name: "US") {
    name
    mostRecent {
      date
      confirmed
    }
  }
}

```

Zeit verified open source: https://covid19-graphql.now.sh/_src

MIT Licensed. PRs welcome! :)
