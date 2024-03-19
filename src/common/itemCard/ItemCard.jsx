import style from './itemCard.module.scss'
import url from '../../data/url.js'

function ItemCard({ item }) {
  const { id, name, cover, description, price, amount } = item

  const urlBase = url.base
  const itemUrl = urlBase + `/items/${id}`
  const coverUrl = urlBase + `/images/${cover.id}`

  return (
    <a className={style.itemCard} href={itemUrl}>
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
          <span className={style.itemStock}>{amount}</span>
        </div>
      </div>
    </a>
  )
}

export default ItemCard
