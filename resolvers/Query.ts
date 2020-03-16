import { QueryResolvers } from './types'
import fetch from 'node-fetch'
import { ApolloError } from 'apollo-server-micro'

const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

const resolvers: QueryResolvers = {
  async results(_parent, { countries, date }) {
    const res = await fetch('https://pomber.github.io/covid19/timeseries.json')
    let results = await res.json()
    const eq = date && date.eq ? formatDate(new Date(date.eq)) : null
    const lt = date && date.lt ? formatDate(new Date(date.lt)) : null
    const gt = date && date.gt ? formatDate(new Date(date.gt)) : null
    let formatted = (countries && countries.length > 0 ? countries : Object.keys(results))
      .reduce((acc, countryName) => {
        const countryResults = results[countryName]
        if (!countryResults) {
          throw new ApolloError(`Couldn't find data from country ${countryName}`)
        }
        const withCountryName = countryResults.map(result => ({ ...result, country: countryName }))
        return [...acc, ...withCountryName]
      }, [])
      .filter(result => {
        const d = formatDate(new Date(result.date))
        return ((eq && d === eq) || (lt && d < lt) || (gt && d > gt)) || !date
      })
    return formatted
  },
  async result(_parent, { country, date }) {
    const res = await fetch('https://pomber.github.io/covid19/timeseries.json')
    let results = await res.json()
    const formattedDate = formatDate(new Date(date))
    const countryResult = results[country]
    const found = countryResult.find(r => {
      const d = formatDate(new Date(r.date))
      return d === formattedDate
    })
    found.country = country
    return found
  }
}

export default resolvers 