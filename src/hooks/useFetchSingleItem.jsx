import { useState, useEffect } from 'react'
import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'

function useFetchSingleItem(id) {
  const itemUrl = url.server + '/items/' + id
  const { data, isLoading, error } = useSWRFetcher(itemUrl)

  return { item: data?.data || [], fetchSingleItemError: error, isLoading }
}

export default useFetchSingleItem
