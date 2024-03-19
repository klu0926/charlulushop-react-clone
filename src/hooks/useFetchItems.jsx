import { useState, useEffect } from 'react'

import url from '../data/url'
const itemsUrl = url.base + '/items'

function useFetchItems() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchItems() {
      console.log('fetching items...')
      try {
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
      } catch (err) {
        setError(err.message)
      }
    }
    fetchItems()

    // clean up
    return () => {
      abortController.abort()
      console.log('abort fetching')
    }
  }, [])
  return { items, error }
}

export default useFetchItems
