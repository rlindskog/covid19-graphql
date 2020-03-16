https://covid19-graphql.now.sh

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
  results (country: ["US", "Canada"], date: { lt: "3/10/2020" }) {
    country
    date
    confirmed
    deaths
    recovered
  }
}

```

Zeit verified open source: https://covid19-graphql.now.sh/_src
