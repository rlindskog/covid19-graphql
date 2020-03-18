# Covid19 GraphQL API

https://covid19-graphql.now.sh

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/rlindskog/covid19-graphql)


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
    growthRate
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

## Projects using this API

[Add yours +](https://github.com/rlindskog/covid19-graphql/edit/master/readme.md)

## License
MIT Licensed. PRs welcome! :)
