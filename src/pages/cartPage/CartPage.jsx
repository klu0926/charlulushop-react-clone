import style from './cartPage.module.scss'
import url from '../../data/url'
import useFetchCartItems from '../../hooks/useFetchCartItems'
import sweetAlert from '../../helpers/sweetAlert'
import LoadingIcon from '../../common/loadingIcon/LoadingIcon'
import { useEffect } from 'react'

function CartPage({ cartItemsId, removeCartItem, clearAllCartItems }) {
  const { items, isLoading, isError } = useFetchCartItems(cartItemsId)

  const imageUrl = url.server + '/images/'
  const orderUrl = url.server + '/orders/'
  // total
  let itemCount = items ? items.length : 0
  let totalPrice = 0
  if (items) {
    totalPrice = items.reduce((total, item) => {
      return total + item.price
    }, 0)
  }

  function handleRemoveClick(itemId) {
    if (itemId && typeof removeCartItem === 'function') {
      removeCartItem(itemId)
    }
  }

  function handleClearAllCartItems() {
    if (typeof clearAllCartItems === 'function') {
      clearAllCartItems()
    }
  }

  // 把頁面往上拉
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function handleCheckout() {
    try {
      // check all item in stock
      let inStock = true
      items.forEach((i) => {
        if (!i.amount) inStock = false
      })
      if (!inStock) throw new Error('請移除已售出的物件')

      // confirm
      const result = await sweetAlert.confirm(
        '確認要下單嗎？',
        '',
        '<p>下單完成後請通知夏洛特，以方便安排出貨</p><p>如需修改訂單也請用IG聯絡夏洛特</p><p>IG帳號: <a href="https://www.instagram.com/charlotte_journalday/" target="_blank">charlotte_journalday</a></p>',
      )
      // 開始post order
      if (result.isConfirmed) {
        const buyerResult = await sweetAlert.orderFrom()
        if (!buyerResult.isConfirmed && !buyerResult.value) return

        const orderData = {
          itemsIdsString: JSON.stringify(cartItemsId),
          buyerName: buyerResult.value.name,
          buyerEmail: buyerResult.value.email,
          buyerIG: buyerResult.value.ig,
          price: totalPrice,
        }

        const response = await fetch(orderUrl, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })
        if (!response.ok) throw new Error(response.statusText)
        const json = await response.json()
        if (!json.ok) throw new Error(json.err)
        await sweetAlert.notice(
          '下單成功，請聯絡夏洛特～',
          'success',
          '同時也可以使用 [查詢訂單] 來查詢訂單狀況',
        )
        handleClearAllCartItems()
      }
    } catch (err) {
      console.error(err)
      await sweetAlert.error('下單失敗', err.message)
      window.location.reload()
    }
  }

  // info
  let info = null
  info = (
    <div className={style.infoContainer}>
      <span className={style.infoTitle}>* 下單小提醒 *</span>
      <ul>
        <p className='info'>
          -請填寫<span>正確</span>的姓名、電子信箱跟IG帳號，以便
          <span>查詢訂單</span>
        </p>
        <p className='info'>
          -下單後請私訊
          <span>
            <a
              className='underline'
              href='https://instagram.com/charlotte_journalday'
              target='_blank'>
              夏洛特的IG
            </a>
          </span>
          ，以便安排出貨
        </p>
        <p className='info'>
          -下單後<span>無法修改</span>，只能聯絡夏洛特取消訂單
        </p>
      </ul>
    </div>
  )

  // 內容
  let itemsContainer = null
  if (isLoading) {
    itemsContainer = (
      <div className={style.placeholder}>
        <LoadingIcon />
      </div>
    )
  } else if (isError) {
    itemsContainer = (
      <div className={style.placeholder}>
        <p>{isError}</p>
      </div>
    )
  } else if (items && items.length === 0) {
    itemsContainer = (
      <div className={style.placeholder}>
        <p>目前沒有物件</p>
      </div>
    )
  } else if (items && items.length !== 0) {
    itemsContainer = (
      <div className={style.itemsContainer}>
        {items.map((item) => {
          const coverUrl = imageUrl + item.cover.id
          return (
            <div
              key={item.id}
              className={
                item.amount ? style.item : `${style.item} ${style.sold}`
              }>
              <img src={coverUrl} alt='cover' className={style.itemImage} />
              <div className={style.itemInfo}>
                <p className={style.name}>{item.name}</p>
                <p className={style.price}>{item.price}</p>
                <p className={style.stock}>
                  {item.amount ? (
                    <span className={style.inStock}>有貨</span>
                  ) : (
                    <span className={style.soldOut}>已售出，請刪除物件</span>
                  )}
                </p>
              </div>
              <button
                type='button'
                className={style.remove}
                onClick={() => {
                  handleRemoveClick(item.id)
                }}>
                x
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  let checkoutContainer = null
  if (items?.length) {
    checkoutContainer = (
      <>
        <div className={style.checkout}>
          <div className={style.checkoutInfo}>
            <p>總共 {itemCount} 個物件</p>
            <p className={style.totalPrice}>總價: {totalPrice}</p>
          </div>
          <button
            id='checkout'
            className={style.checkoutButton}
            type='button'
            onClick={handleCheckout}>
            確定下單
          </button>
        </div>
      </>
    )
  }

  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <div className={style.cartPage}>
            {info}
            {itemsContainer}
            {checkoutContainer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
