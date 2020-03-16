https://covid19-graphql.now.sh

Data is pulled directly from https://github.com/pomber/covid19, which is a JSON representation of https://github.com/CSSEGISandData/COVID-19. All data is up to date.

Example query
```graphql

query {
  result (country: "US", date: "3/15/2020") {
    country
    date
    confirmed
    deaths
    recovered
  }
  results (countries: ["US", "Canada"], date: { lt: "3/10/2020" }) {
    country
    date
    confirmed
    deaths
    recovered
  }
}

```

Zeit verified open source: https://covid19-graphql.now.sh/_src

MIT Licensed. PRs welcome! :)
