import url from '../data/url'
import { useEffect, useState } from 'react'
const tagsUrl = url.server + '/tags'
import useSWRFetcher from './useSWRFetcher'

function useFetchTags() {
  const [currentTagName, setCurrentTagName] = useState(null)

  const { data, error, isLoading } = useSWRFetcher(tagsUrl)

  return {
    tags: data?.data || [],
    isLoading,
    isError: error,
    currentTagName,
    setCurrentTagName,
  }
}

export default useFetchTags
