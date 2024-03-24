import style from './itemCard.module.scss'
import url from '../../data/url.js'

export function ItemCardSkeleton() {
  return (
    <div className={style.skeletonCard}>
      <div className={style.skeletonImageContainer}></div>
      <div className={style.skeletonInfo}>
        <span className={style.skeletonName}></span>
        <div className={style.skeletonPriceDiv}>
          <span className={style.skeletonPrice}></span>
          <span className={style.skeletonStock}></span>
        </div>
      </div>
    </div>
  )
}

export function ItemCard({ item, inCart }) {
  const { id, name, cover, description, price, amount } = item

  // item page
  const itemUrl = url.client + `/#/items/${id}`
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

  // image onload
  function handleOnload(e) {
    const image = e.target
    image.style.opacity = '100%'
    // find itemInfoDiv
    const itemCard = image.closest(`.${style.itemCard}`)
    if (itemCard) {
      const itemInfoDiv = itemCard.querySelector(`.${style.itemInfoDiv}`)
      if (itemInfoDiv) itemInfoDiv.style.opacity = '100%'
    }
  }

  // Conditionally render either a div or an anchor based on the amount
  const renderElement =
    amount === 0 ? (
      <div className={itemCardClass}>
        <div className={style.itemImageContainer}>
          <img
            className={style.itemImage}
            src={coverUrl}
            alt={name}
            loading='lazy'
            onLoad={handleOnload}
          />
        </div>
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
        <div className={style.itemImageContainer}>
          <img
            className={style.itemImage}
            src={coverUrl}
            alt={name}
            loading='lazy'
            onLoad={handleOnload}
          />
        </div>
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
