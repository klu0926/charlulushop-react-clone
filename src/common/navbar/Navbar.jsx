import style from './navbar.module.scss'
import url from '../../data/url'
import closeIcon from '../../images/close.png'
import cryIcon from '../../images/cry-144.png'
import cartIcon from '../../images/cart.png'

const itemsPageUrl = url.client + '/#/items'
const cartPageUrl = url.client + '/#/cart'
const orderPageUrl = url.client + '/#/orders'

import { useState } from 'react'

// hamburger and burger panel
function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen(e) {
    const panel = document.querySelector('#burger-panel')
    if (panel) {
      setIsOpen(true)
      panel.style.display = 'block'
      document.body.style.overflow = 'hidden'
    }
  }
  function handleClose() {
    const panel = document.querySelector('#burger-panel')
    if (panel) {
      setIsOpen(false)
      document.body.style.overflow = 'auto'

      setTimeout(() => {
        panel.style.display = 'none'
      }, 300)
    }
  }

  // panel class
  let panelClass = style.burgerPanel
  if (isOpen) {
    panelClass = panelClass + ' ' + style.active
  }

  return (
    <>
      <div
        id='burgerOpen'
        className={style.burgerContainer}
        onClick={handleOpen}>
        <div className={style.burgerLines}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>
      </div>
      <div id='burger-panel' className={panelClass}>
        <div
          id='burger-panel-background'
          className={style.burgerPanelBackground}
          onClick={handleClose}></div>
        <div id='burger-panel-left' className={style.burgerPanelLeft}>
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
