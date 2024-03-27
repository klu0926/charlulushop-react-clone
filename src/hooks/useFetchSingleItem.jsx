import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchSingleItem(id) {
  const [item, setItem] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // effect
  useEffect(() => {
    const itemUrl = url.server + '/items/' + id
    // abort controller
    const abortController = new AbortController()

    async function fetchItem(id) {
      try {
        setIsLoading(true)
        setIsError(null)

        const response = await fetch(itemUrl, {
          signal: abortController.signal,
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const json = await response.json()
        if (!json.ok) {
          throw new Error(json.err)
        }

        setItem(json.data)
      } catch (err) {
        setIsError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItem()

    // clean up
    return () => {
      abortController.abort()
    }
  }, [id])

  return { item, fetchSingleItemError: isError, isLoading }
}

export default useFetchSingleItem
