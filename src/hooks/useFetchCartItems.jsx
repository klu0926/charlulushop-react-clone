import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchCartItems(cartItemIds = []) {
  const [items, setItems] = useState(null)
  const [fetchCartItemsError, setFetchCartItemsError] = useState(null)

  let itemsUrl = url.server + '/items/cart/' + JSON.stringify(cartItemIds)
  console.log('fetch cart item url:', itemsUrl)

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchCartItems() {
      setFetchCartItemsError(null)
      console.log('fetching cart items...')
      try {
        const response = await fetch(itemsUrl, {
          signal: abortController.signal,
        })
        if (!response.ok) throw new Error(response.statusText)

        const json = await response.json()
        if (!json.ok) throw new Error(json.error)

        if (!abortController.signal.aborted) {
          setItems(json.data)
        }
      } catch (err) {
        //setFetchCartItemsError(err.message)
      }
    }
    fetchCartItems()

    // clean up
    return () => {
      abortController.abort()
      setFetchCartItemsError(null)
    }
  }, [itemsUrl])

  return { items, fetchCartItemsError }
}

export default useFetchCartItems
