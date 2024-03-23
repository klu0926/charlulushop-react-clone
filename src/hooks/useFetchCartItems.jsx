import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchCartItems(cartItemIds = []) {
  const [items, setItems] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let itemsUrl = url.server + '/items/cart/' + JSON.stringify(cartItemIds)

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchCartItems() {
      try {
        setIsError(null)
        setIsLoading(true)

        const response = await fetch(itemsUrl, {
          signal: abortController.signal,
        })
        if (!response.ok) throw new Error(response.statusText)

        const json = await response.json()
        if (!json.ok) throw new Error(json.error)

        setItems(json.data)
        setIsError(null)
      } catch (err) {
        setIsError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCartItems()

    // clean up
    return () => {
      abortController.abort()
      setIsError(null)
    }
  }, [itemsUrl])

  return { items, isLoading, isError }
}

export default useFetchCartItems
