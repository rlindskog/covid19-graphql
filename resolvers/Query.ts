import { QueryResolvers } from './types'
import { ApolloError } from 'apollo-server-micro'

const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

const resolvers: QueryResolvers = {
  async results(_parent, { countries, date }, { getResults }) {
    const results = await getResults()
    const eq = date && date.eq ? formatDate(new Date(date.eq)) : null
    const lt = date && date.lt ? formatDate(new Date(date.lt)) : null
    const gt = date && date.gt ? formatDate(new Date(date.gt)) : null
    let formatted = (countries && countries.length > 0 ? countries : Object.keys(results))
      .reduce((acc, countryName) => {
        const countryResults = results[countryName]
        if (!countryResults) {
          throw new ApolloError(`Couldn't find data from country ${countryName}`)
        }
        const withCountryName = countryResults.map(result => ({ ...result, country: { name: countryName } }))
        return [...acc, ...withCountryName]
      }, [])
      .filter(result => {
        const d = formatDate(new Date(result.date))
        return ((eq && d === eq) || (lt && d < lt) || (gt && d > gt)) || !date
      })
    return formatted
  },
  async result(_parent, { country, date }, { getResults }) {
    const results = await getResults()
    const countryResult = results[country]
    if (date) {
      const formattedDate = formatDate(new Date(date))
      const found = countryResult.find(r => {
        const d = formatDate(new Date(r.date))
        return d === formattedDate
      })
      found.country = country
      return found
    }
    // if no date provided, return the most recent.
    const found = countryResult[countryResult.length - 1]
    found.country = { name: country }
    return found
  },

  async countries(_parent, { names }, { getResults }) {
    const results = await getResults()
    let formatted = (names && names.length > 0 ? names : Object.keys(results))
      .reduce((acc, countryName) => {
        const countryResults = results[countryName] as any[]
        console.log('countryResults', countryResults);
        if (!countryResults) {
          throw new ApolloError(`Couldn't find data from country ${countryName}`)
        }
        const country = { name: countryName, results: countryResults, mostRecent: countryResults[countryResults.length - 1] }
        return [...acc, country]
      }, [])
    return formatted
  },
  async country(_parent, { name }, { getResults }) {
    const data = await getResults()
    const results = data[name]
    if (!results) {
      throw new ApolloError(`Couldn't find data from country ${name}`)
    }
    const country = { name, results, mostRecent: results[results.length - 1] }
    return country
  }

}

export default resolvers 