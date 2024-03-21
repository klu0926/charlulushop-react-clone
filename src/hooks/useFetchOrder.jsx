import { useState, useEffect } from 'react'
import url from '../data/url'

function useFetchOrders() {
  const [orders, setOrders] = useState(null)
  const [fetchOrderError, setFetchOrderError] = useState(null)

  // fetch
  async function fetchOrders(buyerName, buyerEmail) {
    try {
      if (!buyerName || !buyerEmail) throw new Error('Missing name or email')

      let ordersUrl = url.server + '/orders/buyer/'
      ordersUrl += '?buyerName=' + buyerName + '&' + 'buyerEmail=' + buyerEmail

      // reset error
      setFetchOrderError(null)

      const response = await fetch(ordersUrl)
      if (!response.ok) throw new Error(response.statusText)
      const json = await response.json()
      if (!json.ok) throw new Error(json.err)

      setOrders(json.data)
    } catch (err) {
      setFetchOrderError(err.message)
    }
  }

  return { orders, fetchOrders, fetchOrderError }
}

export default useFetchOrders
