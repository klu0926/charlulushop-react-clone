import style from './itemPage.module.scss'
import url from '../../data/url'
import { useParams } from 'react-router-dom'
import useFetchSingleItem from '../../hooks/useFetchSingleItem'
import { useEffect } from 'react'
import LoadingIcon from '../../common/loadingIcon/LoadingIcon'
// image
import leftPNG from '../../images/left.png'

const imageUrl = url.server + '/images/' // /images/:imageId

function ItemPage({ cartItemsId, addToCart, removeCartItem }) {
  const { itemId } = useParams()
  const { item, isError, isLoading } = useFetchSingleItem(itemId)

  function handlePictureClick(e) {
    const coverImage = document.querySelector('#coverImage')
    coverImage.src = e.target.src
  }

  function handleAddButtonClick(e) {
    if (item && typeof addToCart === 'function') {
      addToCart(item.id)
      cartCountJump()
    }
  }

  function handleRemoveButtonClick(e) {
    if (item && typeof removeCartItem === 'function') {
      removeCartItem(item.id)
      cartCountJump()
    }
  }

  function handleImageOnload(e) {
    e.target.style.opacity = '100%'
  }

  function cartCountJump() {
    const cartCount = document.querySelector('#cart-count')
    console.log('cartCount', cartCount)
    if (cartCount) {
      cartCount.classList.remove('jump')
      setTimeout(() => {
        cartCount.classList.add('jump')
      }, 0)
    }
  }

  // 把頁面往上拉
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let status = 'available'
  if (item) {
    if (!item.amount) {
      status = 'sold'
    } else if (cartItemsId.some((id) => id === item.id)) {
      status = 'inCart'
    }
  }

  const imageCount = item?.images?.length || 0

  // 內容
  let content = ''
  if (isLoading) {
    content = (
      <div className={style.placeholder}>
        <LoadingIcon />
      </div>
    )
  } else if (isError) {
    content = (
      <div className={style.placeholder}>
        <p> {isError}</p>
      </div>
    )
  } else if (item) {
    content = (
      <>
        <button
          className={style.backButton}
          onClick={() => window.history.back()}>
          <img src={leftPNG} alt='back' />
        </button>
        <div className={style.itemContainer}>
          <div className={style.itemImageGroupContainer}>
            <div className={style.itemCoverContainer}>
              <img
                id='coverImage'
                className={style.itemCover}
                src={imageUrl + item.cover.id}
                alt='cover'
                onLoad={handleImageOnload}
              />
            </div>

            <div className={style.pictureSlider}>
              {item.images.map((i) => (
                <div
                  key={`item-picture-${i.id}`}
                  className={style.itemPictureContainer}>
                  <img
                    className={style.itemPicture}
                    src={imageUrl + i.id}
                    alt='picture'
                    onClick={handlePictureClick}
                    onLoad={handleImageOnload}
                  />
                </div>
              ))}
            </div>
            <span className={style.pictureCount}>
              照片&#40;{imageCount}&#41;
            </span>
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
            <div className={style.buttonsContainer}>
              <button
                className={style.backButtonBelow}
                onClick={() => window.history.back()}>
                返回
              </button>
              {status === 'available' && (
                <button
                  className={style.addButton}
                  onClick={handleAddButtonClick}>
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
        </div>
      </>
    )
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
