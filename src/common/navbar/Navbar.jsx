import style from './navbar.module.scss'
import url from '../../data/url'
import closeIcon from '../../images/close.png'
import cryIcon from '../../images/cry-144.png'
import cartIcon from '../../images/cart.png'

const itemsPageUrl = url.client + '/#/items'
const cartPageUrl = url.client + '/#/cart'
const orderPageUrl = url.client + '/#/orders'

import { useState } from 'react'

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)

  let panelClass = style.burgerPanel
  if (isOpen) {
    panelClass = panelClass + ' ' + style.active
  }

  function handleOpen(e) {
    const panel = document.querySelector('#burger-panel')
    if (panel) {
      setIsOpen(true)
      panel.style.display = 'block'
    }
  }
  function handleClose() {
    const panel = document.querySelector('#burger-panel')
    if (panel) {
      setIsOpen(false)
      panel.style.display = 'none'
    }
  }

  return (
    <>
      <div className={style.burgerContainer}>
        <div
          className={style.burgerOpen}
          type='checkbox'
          id='burgerOpen'
          onClick={handleOpen}
        />
        <div className={style.burgerLink}></div>
        <div className={style.burgerLink}></div>
        <div className={style.burgerLink}></div>
      </div>
      <div id='burger-panel' className={panelClass}>
        <div
          className={style.burgerClose}
          id='burgerClose'
          onClick={handleClose}>
          <img className={style.burgerCloseImg} src={closeIcon} alt='close' />
        </div>
        <div className={style.burgerLinks}>
          <a
            className={style.burgerLink}
            href={itemsPageUrl}
            onClick={handleClose}>
            全部好貨
          </a>
          <a
            className={style.burgerLink}
            href={orderPageUrl}
            onClick={handleClose}>
            查詢訂單
          </a>
          <a
            className={style.burgerLink}
            href={cartPageUrl}
            onClick={handleClose}>
            購物車
          </a>
        </div>
      </div>
    </>
  )
}

function LogoContainer() {
  return (
    <div className={style.logoContainer}>
      <a className={style.logoLink} href={itemsPageUrl}>
        <div className={style.logoDiv}>
          <img className={style.logo} src={cryIcon} alt='logo' />
        </div>
        <div className={style.logoTextContainer}>
          <span className={style.logoText}>Charlulu's</span>
          <span className={style.logoText}>斷。捨。離</span>
        </div>
      </a>
    </div>
  )
}

function Links() {
  return (
    <div className={style.links}>
      <a className={style.link} href={itemsPageUrl}>
        全部好貨
      </a>
      <a className={style.link} href={orderPageUrl}>
        查詢訂單
      </a>
    </div>
  )
}

function Cart({ cartItemsId }) {
  function closeMenuPanel() {
    const panel = document.querySelector('#burger-panel')
    if (panel) {
      panel.style.display = 'none'
    }
  }
  return (
    <a className={style.cart} href={cartPageUrl} onClick={closeMenuPanel}>
      <img className={style.cartIcon} src={cartIcon} alt='cart' />
      {cartItemsId && (
        <div className={style.cartCount}>
          {cartItemsId ? cartItemsId.length : 0}
        </div>
      )}
    </a>
  )
}

function Navbar({ cartItemsId }) {
  return (
    <div className={style.navbar}>
      <div className='RWD-container'>
        <div className={style.navbarContainer}>
          <div className={style.sideLeft}>
            <Hamburger />
          </div>
          <div className={style.sideMiddle}>
            <LogoContainer />
          </div>
          <div className={style.sideRight}>
            <Links />
            <Cart cartItemsId={cartItemsId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
