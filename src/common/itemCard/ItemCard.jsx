import style from './itemCard.module.scss'
import url from '../../data/url.js'

function ItemCard({ item }) {
  const { id, name, cover, description, price, amount } = item

  // item page
  const itemUrl = url.client + `/items/${id}`

  // server cover image
  const coverUrl = url.server + `/images/${cover.id}`

  let itemCardClass = style.itemCard
  if (amount === 0) {
    itemCardClass = itemCardClass + ' ' + style.soldout
  }

  return (
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
          <span className={style.itemStock}>{amount ? '有貨' : '售完'}</span>
        </div>
      </div>
    </a>
  )
}

export default ItemCard
