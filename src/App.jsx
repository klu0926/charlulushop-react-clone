import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ItemPage from './pages/itemPage/ItemPage.jsx'
import ItemsPage from './pages/itemsPage/ItemsPage.jsx'
import OrdersPage from './pages/ordersPage/OrdersPage.jsx'
import CartPage from './pages/cartPage/CartPage.jsx'
import Navbar from './common/navbar/Navbar.jsx'
import Footer from './common/footer/Footer.jsx'
// hooks
import useCart from './hooks/useCart.jsx'

function App() {
  const { cartItemsId, addCartItem, removeCartItem, clearAllCartItems } =
    useCart()

  return (
    <>
      <Navbar cartItemsId={cartItemsId}></Navbar>
      <BrowserRouter>
        <div className='routers'>
          <Routes>
            <Route path='/' element={<Navigate to='/items' />}></Route>
            <Route
              path='/items/:itemId'
              element={
                <ItemPage
                  cartItemsId={cartItemsId}
                  addToCart={addCartItem}
                  removeCartItem={removeCartItem}
                />
              }></Route>
            <Route
              path='/items/'
              element={<ItemsPage cartItemsId={cartItemsId} />}></Route>
            <Route
              path='/cart'
              element={
                <CartPage
                  cartItemsId={cartItemsId}
                  removeCartItem={removeCartItem}
                  clearAllCartItems={clearAllCartItems}
                />
              }></Route>
            <Route path='/orders' element={<OrdersPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
