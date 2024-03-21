import style from './ordersPage.module.scss'
import useFetchOrders from '../../hooks/useFetchOrder'
import sweetAlert from '../../helpers/sweetAlert'
import url from '../../data/url'

function OrderPage() {
  const { orders, fetchOrders, fetchOrderError } = useFetchOrders()

  console.log('orders', orders)
  const coverUrl = url.server + '/images/'

  async function handleFetchOrder(e) {
    try {
      const name = document.querySelector('#name').value.trim()
      const email = document.querySelector('#email').value.trim()
      if (!name || !email) {
        throw new Error('請輸入名稱與信箱')
      }
      await fetchOrders(name, email)
    } catch (err) {
      await sweetAlert.error('查詢失敗', err.message)
    }
  }

  let ordersContent = null
  if (!orders || orders.length === 0) {
    ordersContent = (
      <div className={style.noOrder}>
        <p>目前沒有訂單</p>
      </div>
    )
  } else {
    ordersContent = (
      <>
        <div className={style.totalOrder}>
          <p className='info'>
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
  }

  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <div className={style.orderPage}>
            <div className={style.searchContainer}>
              <h1>訂單查詢</h1>
              <p className='info'>
                請使用<span> 名稱 </span>跟<span> 信箱 </span>來查詢您的訂單
              </p>
              <p>如果需要修改或是刪除訂單請聯絡夏洛特</p>
              <p>
                IG帳號:{' '}
                <a
                  className='text-link'
                  href='https://www.instagram.com/charlotte_journalday/'
                  target='_blank'>
                  charlotte_journalday
                </a>
              </p>
              <div className={style.search}>
                <div className={style.inputGroup}>
                  <label htmlFor='name'>名稱: </label>
                  <input id='name' type='text' placeholder='輸入名稱...' />
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor='email'>信箱: </label>
                  <input id='email' type='email' placeholder='輸信箱...' />
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
