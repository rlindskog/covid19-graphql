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
      date(format: "yyyy-MM-dd")
      confirmed
    }
  }
}

```

Zeit verified open source: https://covid19-graphql.now.sh/_src

## Projects using this API

- [I am Covid -19 🦠](https://iamcovid-19.netlify.com/) ([repo](https://github.com/cryptodoct0r/Covid-19-Status-gql)) - Visualization of the covid-19 dataset using Nuxtjs(vuejs), Graphql and valuable information about geeting through the Covid-19 pandemic.
- [covid19-bot](https://vk.me/covid_stat) ([repo](https://github.com/keyzt/covid-19-Bot)) - Chat bot for showing information about the Covid-19 pandemic.
- [Covid-19
Pandemic Status](http://corona.rickkln.com/) ([repo](https://github.com/rickkln/corona)) - A simple tool to track global progress in defeating Covid-19, by focusing on the rate of change in death count globally and classifying countries by associated status.
- [covid-19](https://unpolaco.github.io/covid-19/) ([repo](https://github.com/unpolaco/covid-19)) - Simple app made with React, Nivo charts and GSAP.

[Add yours +](https://github.com/rlindskog/covid19-graphql/edit/master/README.md)

## License
MIT Licensed. PRs welcome! :)
