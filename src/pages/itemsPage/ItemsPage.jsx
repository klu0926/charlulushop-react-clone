import style from './itemsPage.module.scss'
import useFetchItems from '../../hooks/useFetchItems'
import useFetchTags from '../../hooks/useFetchTags'
import { ItemCard, ItemCardSkeleton } from '../../common/itemCard/ItemCard'
import TagsSlider from '../../common/tagsSlider/TagsSlider'
import Search from '../../common/search/Search'
import useSearch from '../../hooks/useSearch'
import dieIcon from '../../images/die.png'
import YoutubeDiv from '../../common/youtubeDiv/YoutubeDiv'
import banner from '../../images/banner.png'
import bannerSmall from '../../images/banner-small.png'
import { useState, useEffect } from 'react'
import Toggle from '../../common/toggle/Toggle'

function Banner() {
  return (
    <div className={style.bannerContainer}>
      <img className={style.banner} src={banner} alt='banner' />
      <img className={style.bannerSmall} src={bannerSmall} alt='banner' />
    </div>
  )
}

function ItemsPage({ cartItemsId }) {
  const [itemsTotal, setItemsTotal] = useState(0)
  const { search, setSearch } = useSearch()
  const {
    tags,
    isLoading: isTagLoading,
    isError: isTagError,
    currentTagName,
    setCurrentTagName,
  } = useFetchTags()
  const { items, isLoading, fetchItemsError, key, mutate } = useFetchItems(
    currentTagName,
    search,
  )
  const [isSorted, setIsSorted] = useState(true)
  const [isOnlyInStock, setIsOnlyInStock] = useState(true)
  const [sortedItems, setSortedItems] = useState([])

  // 自動刷新
  useEffect(() => {
    mutate(key)
  }, [])

  // sort items amount 0 to the end
  function sortItems(items) {
    if (items && items.length !== 0) {
      return [...items].sort((a, b) => b.amount - a.amount)
    }
    return []
  }

  // set sortedItems
  if (!isLoading && items && isSorted && items.length !== sortedItems.length) {
    setSortedItems(sortItems(items))
  }

  function toggleItemSort() {
    if (isSorted) {
      setIsSorted(false)
    } else if (items && items.length !== 0) {
      setIsSorted(true)
    }
  }

  // isOnlyInStock
  function ToggleIsOnlyStock() {
    setIsOnlyInStock((prev) => !prev)
  }

  // set total items count
  if (!search && !currentTagName && items && itemsTotal !== items.length) {
    setItemsTotal(items.length)
  }

  function checkInCart(itemId) {
    if (itemId === undefined || !cartItemsId) return false
    return cartItemsId.some((i) => i === itemId)
  }

  // 貨物
  let contentItems = items ? [...items] : []
  // 貨物 sorted
  if (isSorted && sortedItems) {
    contentItems = sortedItems
  }
  // 貨物 isOnlyInStock
  if (isOnlyInStock) {
    contentItems = contentItems.filter((item) => item.amount !== 0)
  }

  // 主內容
  let contains = null
  if (isLoading) {
    // show loading
    contains = (
      <div className={style.gridContainer}>
        {Array.from({ length: 12 }).map((_, index) => {
          return <ItemCardSkeleton key={`itemCart-skeleton-${index}`} />
        })}
      </div>
    )
  } else if (fetchItemsError) {
    // show error
    contains = (
      <div className={style.placeholder}>
        <p>{fetchItemsError}</p>
      </div>
    )
  } else if (items && items.length === 0) {
    // no items
    contains = (
      <div className={style.placeholder}>
        <div className={style.noItemsContainer}>
          <img src={dieIcon} alt='icon' />
          <span>找不到東西...</span>
        </div>
      </div>
    )
  } else if (contentItems && contentItems.length !== 0) {
    // has items
    contains = (
      <>
        <div className={style.gridContainer}>
          {contentItems.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                inCart={checkInCart(item.id)}
              />
            )
          })}
        </div>
      </>
    )
  }
  // 回傳
  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <Banner />
          <Search setSearch={setSearch} />
          <div className={style.tagsSortContainer}>
            <div className={style.togglesContainer}>
              <Toggle
                handleOnClick={ToggleIsOnlyStock}
                onText={'有貨'}
                offText={'全部'}
              />

              <Toggle
                handleOnClick={toggleItemSort}
                onText={'庫存'}
                offText={'最新'}
                disabled={isOnlyInStock}
              />
            </div>

            <TagsSlider
              tags={tags}
              currentTagName={currentTagName}
              setCurrentTagName={setCurrentTagName}
              isLoading={isTagLoading}
              isError={isTagError}
              itemsTotal={itemsTotal}
            />
          </div>
          {contains}
          <YoutubeDiv />
        </div>
      </div>
    </div>
  )
}

export default ItemsPage
