import style from './navbar.module.scss'

function Navbar({ cartItemsId }) {
  const itemsPageUrl = '/items'
  const cartPageUrl = '/cart'
  const orderPageUrl = '/orders'

  return (
    <div className={style.navbar}>
      <div className='RWD-container'>
        <div className={style.navbarContainer}>
          <a className={style.logoContainer} href={itemsPageUrl}>
            <img className={style.logo} src='/images/cry.png' alt='logo' />
            <span className={style.logoText}>斷。捨。離</span>
          </a>
          <div className={style.links}>
            <a className={style.link} href={itemsPageUrl}>
              全部好貨
            </a>
            <a className={style.link} href={orderPageUrl}>
              查詢訂單
            </a>
            <a className={style.cart} href={cartPageUrl}>
              <img
                className={style.cartIcon}
                src='/images/cart.png'
                alt='cart'
              />
              {cartItemsId && (
                <div className={style.cartCount}>
                  {cartItemsId ? cartItemsId.length : 0}
                </div>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
