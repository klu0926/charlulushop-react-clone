import url from '../data/url'
import useSWR from 'swr'
import useSWRFetcher from './useSWRFetcher'

function useFetchItems(tag, search) {
  const queryTag = tag || ''
  const querySearch = search || ''

  // URL
  let itemsUrl = url.server + '/items'
  itemsUrl += '?queryTag=' + queryTag + '&' + 'search=' + querySearch

  // SWR
  const { data, error, isLoading } = useSWRFetcher(itemsUrl)
  return { items: data?.data || [], isLoading, fetchItemsError: error }
}
export default useFetchItems
