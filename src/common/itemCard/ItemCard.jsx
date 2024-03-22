import style from './itemCard.module.scss'
import url from '../../data/url.js'

function ItemCard({ item, inCart }) {
  const { id, name, cover, description, price, amount } = item

  // item page
  const itemUrl = url.client + `/items/${id}`
  // server cover image
  const coverUrl = url.server + `/images/${cover.id}`

  // card class
  let itemCardClass = style.itemCard
  if (amount === 0) {
    itemCardClass = itemCardClass + ' ' + style.soldout
  }
  if (inCart) {
    itemCardClass = itemCardClass + ' ' + style.inCart
  }

  // Conditionally render either a div or an anchor based on the amount
  const renderElement =
    amount === 0 ? (
      <div className={itemCardClass}>
        <img
          className={style.itemImage}
          src={coverUrl}
          alt={name}
          loading='lazy'
        />
        <div className={style.itemInfoDiv}>
          <span className={style.itemName}> {name} </span>
          <div className={style.itemPriceDiv}>
            <span className={style.itemPrice}>{price} </span>
            <span className={style.itemStock}>售完</span>
          </div>
        </div>
      </div>
    ) : (
      <a className={itemCardClass} href={itemUrl}>
        <img
          className={style.itemImage}
          src={coverUrl}
          alt={name}
          loading='lazy'
        />
        <div className={style.itemInfoDiv}>
          <span className={style.itemName}> {name} </span>
          <div className={style.itemPriceDiv}>
            <span className={style.itemPrice}>{price} </span>
            <span className={style.itemStock}>有貨</span>
          </div>
        </div>
      </a>
    )

  return renderElement
}

export default ItemCard
