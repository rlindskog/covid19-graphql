import { QueryResolvers } from './types'
import { ApolloError } from 'apollo-server-micro'

const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

const getGrowthRate = (index: number, results: any) => {
  if (index === 0) {
    return 0
  }
  const prevResult = results[index - 1]
  const currentResult = results[index]
  if (!prevResult || prevResult.confirmed === 0) {
    return undefined
  }
  return (currentResult.confirmed - prevResult.confirmed) / prevResult.confirmed
}

const resolvers: QueryResolvers = {
  async results(_parent, { countries, date }, { getResults }) {
    const results = await getResults()
    const eq = date && date.eq ? formatDate(new Date(date.eq)) : null
    const lt = date && date.lt ? new Date(formatDate(new Date(date.lt))) : null
    const gt = date && date.gt ? new Date(formatDate(new Date(date.gt))) : null

    const countryNames = countries && countries.length > 0 ? countries : Object.keys(results)
    let formatted = countryNames
      .reduce((acc, countryName) => {
        const countryResults = results[countryName]
        if (!countryResults) {
          throw new ApolloError(`Couldn't find data from country ${countryName}`)
        }
        const withCountryName = countryResults.map((result, index) => ({ ...result, growthRate: getGrowthRate(index, countryResults), country: { name: countryName } }))
        return [...acc, ...withCountryName]
      }, [])
      .filter(result => {
        const d = new Date(result.date)
        return ((eq && formatDate(d) === eq) || (lt && d < lt) || (gt && d > gt)) || !date
      })
    return formatted
  },
  async result(_parent, { country, date }, { getResults }) {
    const results = await getResults()
    const countryResult = results[country]
    if (date) {
      const formattedDate = formatDate(new Date(date))
      const foundIndex = countryResult.findIndex(r => {
        const d = formatDate(new Date(r.date))
        return d === formattedDate
      })
      const found = countryResult[foundIndex]
      found.country = country
      found.growthRate = getGrowthRate(foundIndex, countryResult)
      return found
    }
    // if no date provided, return the most recent.
    const lastIndex = countryResult.length - 1
    const found = countryResult[lastIndex]
    found.growthRate = getGrowthRate(lastIndex, countryResult)
    found.country = { name: country }
    return found
  },

  async countries(_parent, { names }, { getResults }) {
    const results = await getResults()
    let formatted = (names && names.length > 0 ? names : Object.keys(results))
      .reduce((acc, countryName) => {
        const countryResults = results[countryName] as any[]
        if (!countryResults) {
          throw new ApolloError(`Couldn't find data from country ${countryName}`)
        }
        const updatedResults = countryResults.map((result, index) => ({ ...result, growthRate: getGrowthRate(index, countryResults) }))
        const mostRecentIndex = countryResults.length - 1
        const mostRecent = countryResults[mostRecentIndex]
        mostRecent.growthRate = getGrowthRate(mostRecentIndex, updatedResults)
        const country = { name: countryName, results: updatedResults, mostRecent }
        return [...acc, country]
      }, [])
    return formatted
  },
  async country(_parent, { name }, { getResults }) {
    const data = await getResults()
    let results = data[name]
    if (!results) {
      throw new ApolloError(`Couldn't find data from country ${name}`)
    }
    results = results.map((result, index) => ({
      ...result,
      growthRate: getGrowthRate(index, results)
    }))
    const country = { name, results, mostRecent: results[results.length - 1] }
    return country
  }

}

export default resolvers 