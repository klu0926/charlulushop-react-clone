import { useState, useEffect } from 'react'
import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'

function useFetchCartItems(cartItemIds = []) {
  let itemsUrl = url.server + '/items/cart/' + JSON.stringify(cartItemIds)

  const { data, isLoading, error } = useSWRFetcher(itemsUrl)

  return { items: data?.data, isLoading, isError: error }
}

export default useFetchCartItems
