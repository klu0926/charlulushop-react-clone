import style from './itemsPage.module.scss'
import useFetchItems from '../../hooks/useFetchItems'
import useFetchTags from '../../hooks/useFetchTags'
import ItemCard from '../../common/itemCard/ItemCard'
import TagsSlider from '../../common/tagsSlider/TagsSlider'
import Search from '../../common/search/Search'
import useSearch from '../../hooks/useSearch'

function ItemsPage(cartItems) {
  const { search, setSearch } = useSearch()
  const { tags, currentTagName, setCurrentTagName } = useFetchTags()
  const { items, fetchItemsError } = useFetchItems(currentTagName, search)

  console.log('items page error:', fetchItemsError)

  function checkInCart(item) {
    if (!item || !cartItems) return false
    return cartItems.some((i) => i.id === item.id)
  }

  // 主內容
  let contains = null
  if (items) {
    contains = (
      <div className={style.gridContainer}>
        {items.map((item) => {
          return <ItemCard key={item.id} item={item} inCart={checkInCart()} />
        })}
      </div>
    )
  } else if (fetchItemsError) {
    contains = (
      <div className={style.placeholder}>
        <p>{fetchItemsError}</p>
      </div>
    )
  } else {
    contains = <div className={style.placeholder}></div>
  }

  // 回傳
  return (
    <div className='page'>
      <div className='RWD-container'>
        <div className='background'>
          <Search onInput={setSearch} />
          <TagsSlider
            tags={tags}
            currentTagName={currentTagName}
            setCurrentTagName={setCurrentTagName}
          />
          {contains}
        </div>
      </div>
    </div>
  )
}

export default ItemsPage
