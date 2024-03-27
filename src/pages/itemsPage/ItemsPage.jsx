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


function Banner(){
  return (
    <div className={style.bannerContainer}>
      <img className={style.banner} src={banner} alt='banner' />
      <img className={style.bannerSmall} src={bannerSmall} alt='banner' />
    </div>
  )
}

function ItemsPage({ cartItemsId }) {
  const { search, setSearch } = useSearch()
  const {
    tags,
    isLoading: isTagLoading,
    isError: isTagError,
    currentTagName,
    setCurrentTagName,
  } = useFetchTags()
  const { items, isLoading, fetchItemsError } = useFetchItems(
    currentTagName,
    search,
  )
  function checkInCart(itemId) {
    if (itemId === undefined || !cartItemsId) return false
    return cartItemsId.some((i) => i === itemId)
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
  } else if (items && items.length !== 0) {
    // has items
    contains = (
      <div className={style.gridContainer}>
        {items.map((item) => {
          return (
            <ItemCard key={item.id} item={item} inCart={checkInCart(item.id)} />
          )
        })}
      </div>
    )
  }
  // 回傳
  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <Banner/>
          <Search setSearch={setSearch} />
          <TagsSlider
            tags={tags}
            currentTagName={currentTagName}
            setCurrentTagName={setCurrentTagName}
            isLoading={isTagLoading}
            isError={isTagError}
          />
          {contains}
          <YoutubeDiv />
        </div>
      </div>
    </div>
  )
}

export default ItemsPage
