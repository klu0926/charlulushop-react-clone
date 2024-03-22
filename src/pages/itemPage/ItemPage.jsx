import style from './itemPage.module.scss'
import url from '../../data/url'
import { useParams } from 'react-router-dom'
import useFetchSingleItem from '../../hooks/useFetchSingleItem'

const imageUrl = url.server + '/images/' // /images/:imageId

function ItemPage({ cartItemsId, addToCart, removeCartItem }) {
  const { itemId } = useParams()
  const { item, fetchSingleItemError, isLoading } = useFetchSingleItem(itemId)

  function handlePictureClick(e) {
    const coverImage = document.querySelector('#coverImage')
    coverImage.src = e.target.src
  }

  function handleAddButtonClick(e) {
    if (item && typeof addToCart === 'function') {
      addToCart(item.id)
    }
  }

  function handleRemoveButtonClick(e) {
    if (item && typeof removeCartItem === 'function') {
      removeCartItem(item.id)
    }
  }

  let status = 'available'
  if (item) {
    if (!item.amount) {
      status = 'sold'
    } else if (cartItemsId.some((id) => id === item.id)) {
      status = 'inCart'
    }
  }


  const imageCount = item?.images?.length || 0

  // ! need to have away to check if item is already in cart

  let content = null
  if (item) {
    content = (
      <div className={style.itemContainer}>
        <div className={style.itemImageContainer}>
          <img
            id='coverImage'
            className={style.itemCover}
            src={imageUrl + item.cover.id}
            alt='cover'
          />
          <div className={style.pictureSlider}>
            {item.images.map((i) => (
              <img
                key={i.id}
                className={style.itemPicture}
                src={imageUrl + i.id}
                alt='picture'
                onClick={handlePictureClick}
              />
            ))}
          </div>
          <span className={style.pictureCount}>照片&#40;{imageCount}&#41;</span>
        </div>
        <div className={style.infoContainer}>
          <h2 className={style.header}>{item.name}</h2>
          <div className={style.tagsContainer}>
            {item.tags &&
              item.tags.map((t) => (
                <span key={t.id} className={style.tag}>
                  {t.name}
                </span>
              ))}
          </div>
          <div className={style.box}>
            <p className={style.title}>介紹</p>
            <p className={style.text}>{item.description}</p>
          </div>
          <div className={style.box}>
            <p className={style.title}>價格</p>
            <p className={style.price}>
              <span className={style.dollar}>台幣 </span>
              <span>{item.price}</span>
            </p>
          </div>
          {status === 'available' && (
            <button className={style.addButton} onClick={handleAddButtonClick}>
              加入購物車
            </button>
          )}
          {status === 'inCart' && (
            <button
              className={style.removeButton}
              onClick={handleRemoveButtonClick}>
              移除
            </button>
          )}
          {status === 'sold' && (
            <button className={style.addButtonDisable}>商品已售出</button>
          )}
        </div>
      </div>
    )
  } else if (fetchSingleItemError) {
    content = (
      <div className={style.placeholder}>
        <p> {fetchSingleItemError}</p>
      </div>
    )
  } else {
    content = <div className={style.placeholder}></div>
  }

  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>{content}</div>
      </div>
    </div>
  )
}

export default ItemPage
