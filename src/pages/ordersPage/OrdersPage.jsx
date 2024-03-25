import style from './ordersPage.module.scss'
import useFetchOrders from '../../hooks/useFetchOrder'
import sweetAlert from '../../helpers/sweetAlert'
import url from '../../data/url'
import LoadingIcon from '../../common/loadingIcon/LoadingIcon'
import { useState, useEffect } from 'react'
import sorryIcon from '../../images/sorry.png'

function OrderPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const { orders, isLoading, isError, fetchOrders } = useFetchOrders()

  const coverUrl = url.server + '/images/'

  async function handleFetchOrder(e) {
    try {
      const name = document.querySelector('#name').value.trim()
      const email = document.querySelector('#email').value.trim()
      if (!name || !email) {
        throw new Error('請輸入名稱與信箱')
      }
      setIsSearched(true)
      await fetchOrders(name, email)
    } catch (err) {
      await sweetAlert.error('查詢失敗', err.message)
    }
  }

  function handleNameInput(e) {
    setIsSearched(false)
    setName(e.target.value)
  }
  function handleEmailInput(e) {
    setIsSearched(false)
    setEmail(e.target.value)
  }

  // 把頁面往上拉
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 內容
  let ordersContent = null
  if (isLoading) {
    ordersContent = (
      <div className={style.placeholder}>
        <LoadingIcon />
      </div>
    )
  } else if (isError) {
    ordersContent = (
      <div className={style.placeholder}>
        <p>{isError.message}</p>
      </div>
    )
  } else if (isSearched && orders && orders.length === 0) {
    ordersContent = (
      <div className={style.placeholder}>
        <div className={style.noItemsContainer}>
          <img src={sorryIcon} alt='sorr yicon' />
          <span>找不到您的訂單</span>
        </div>
        <p className='info'>
          名稱 : <span>{name}</span>
        </p>
        <p className='info'>
          信箱 : <span>{email}</span>
        </p>
      </div>
    )
  } else if (isSearched && orders && orders.length !== 0) {
    ordersContent = (
      <>
        <div className={style.totalOrder}>
          <p className={style.orderCount}>
            總共有<span> {orders.length} </span>筆訂單
          </p>
        </div>
        <div className={style.orderContainer}>
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className={
                  order.status === '取消訂單'
                    ? `${style.cancel} ${style.order}`
                    : style.order
                }>
                <div className={style.header}>
                  <span>編號: {order.id}</span>
                  <span>狀態: {order.status}</span>
                  <span>總價: {order.price}</span>
                </div>
                {order.items.map((item) => {
                  return (
                    <div key={item.id} className={style.item}>
                      <img src={coverUrl + item.cover.id} alt='cover' />
                      <div className={style.info}>
                        <p className={style.name}>{item.name}</p>
                        <p className={style.price}>{item.price}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    ordersContent = (
      <div className={style.orderCount}>
        <p>～請輸入名稱與信箱查詢您的訂單～</p>
      </div>
    )
  }

  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <div className={style.orderPage}>
            <div className={style.searchContainer}>
              <h2 className={style.orderInoTitle}>訂單查詢</h2>
              <div className={style.orderInfo}>
                <p className='info'>
                  請使用<span> 名稱 </span>跟<span> 電子信箱 </span>來查詢您的訂單
                </p>

                <p>如果需要刪除訂單請私訊IG夏洛特</p>
                <p>
                  IG帳號:{' '}
                  <a
                    className='underline'
                    href='https://www.instagram.com/charlotte_journalday/'
                    target='_blank'>
                    charlotte_journalday
                  </a>
                </p>
              </div>
              <div className={style.search}>
                <div className={style.inputGroup}>
                  <label htmlFor='name'>名稱 : </label>
                  <input
                    id='name'
                    type='text'
                    placeholder='輸入名稱...'
                    onInput={handleNameInput}
                  />
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor='email'>信箱 : </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='輸信箱...'
                    onInput={handleEmailInput}
                  />
                </div>
                <button
                  id='searchButton'
                  className={style.searchButton}
                  type='button'
                  onClick={handleFetchOrder}>
                  搜尋
                </button>
              </div>
            </div>
            <div className={style.orderDisplay}>{ordersContent}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
