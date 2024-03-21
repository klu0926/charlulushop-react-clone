import url from '../data/url'
import { useEffect, useState } from 'react'
const tagsUrl = url.server + '/tags'

function useFetchTags() {
  const [currentTagName, setCurrentTagName] = useState(null)
  const [tags, setTags] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchTags() {
      try {
        const response = await fetch(tagsUrl, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const json = await response.json()
        if (!json.ok) {
          throw new Error(json.err)
        }
        setTags(json.data)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchTags()

    // clean up
    return () => {
      abortController.abort()
    }
  }, [])

  return { tags, error, currentTagName, setCurrentTagName }
}

export default useFetchTags
