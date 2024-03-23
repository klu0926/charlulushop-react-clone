import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchOrders() {
  const [orders, setOrders] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // fetch
  async function fetchOrders(buyerName, buyerEmail) {
    try {
      setIsError(false)
      setIsLoading(true)

      if (!buyerName || !buyerEmail) throw new Error('Missing name or email')

      let ordersUrl = url.server + '/orders/buyer/'
      ordersUrl += '?buyerName=' + buyerName + '&' + 'buyerEmail=' + buyerEmail

      const response = await fetch(ordersUrl)
      if (!response.ok) throw new Error(response.statusText)
      const json = await response.json()
      if (!json.ok) throw new Error(json.err)

      setOrders(json.data)
      setIsError(null)
    } catch (err) {
      setIsError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { orders, isLoading, isError, fetchOrders }
}

export default useFetchOrders
