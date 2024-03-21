import { useState, useEffect } from 'react'

function useCart() {
  const storedItems = JSON.parse(localStorage.getItem('items')) || []
  const [cartItemsId, setCartItemsId] = useState(storedItems)

  //update local storage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cartItemsId))
  }, [cartItemsId])

  // methods
  function hasItem(itemId) {
    const result = cartItemsId.some((id) => id === itemId)
    return result
  }
  function addCartItem(itemId) {
    if (!hasItem(itemId)) {
      setCartItemsId((prevItems) => [...prevItems, itemId])
    }
  }
  function removeCartItem(itemId) {
    if (hasItem(itemId)) {
      const updatedCart = cartItemsId.filter((id) => id !== itemId)
      setCartItemsId(updatedCart)
    }
  }

  function clearAllCartItems() {
    setCartItemsId([])
  }

  return { cartItemsId, addCartItem, removeCartItem, clearAllCartItems }
}

export default useCart
