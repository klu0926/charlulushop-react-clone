import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchItems(tag, search) {
  const [items, setItems] = useState(null)
  const [fetchItemsError, setFetchItemsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const queryTag = tag || ''
  const querySearch = search || ''

  // URL
  let itemsUrl = url.server + '/items'
  itemsUrl += '?queryTag=' + queryTag + '&' + 'search=' + querySearch

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchItems() {
      try {
        setIsLoading(true)
        setFetchItemsError(null)

        const response = await fetch(itemsUrl, {
          signal: abortController.signal,
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const json = await response.json()
        if (!json.ok) {
          throw new Error(json.err)
        }
        setItems(json.data)
        setFetchItemsError(null)
      } catch (err) {
        setFetchItemsError(err.message)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()

    // clean up
    return () => {
      abortController.abort()
    }
  }, [itemsUrl])
  return { items, isLoading, fetchItemsError }
}

export default useFetchItems
