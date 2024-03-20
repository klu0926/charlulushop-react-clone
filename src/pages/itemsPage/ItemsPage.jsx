import style from './itemsPage.module.scss'
import useFetchItems from '../../hooks/useFetchItems'
import useFetchTags from '../../hooks/useFetchTags'
import ItemCard from '../../common/itemCard/ItemCard'
import TagsSlider from '../../common/tagsSlider/TagsSlider'
import Search from '../../common/search/Search'
import useSearch from '../../hooks/useSearch'

function ItemsPage() {
  const { search, setSearch } = useSearch()
  const { tags, currentTagName, setCurrentTagName } = useFetchTags()
  const { items } = useFetchItems(currentTagName, search)

  // 主內容
  let contains = null
  if (items) {
    contains = (
      <div className={style.gridContainer}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    )
  } else {
    contains = <p>Oops...找不到貨物資料</p>
  }

  // 回傳
  return (
    <div className='page'>
      <div className='RWD-container'>
        <Search onInput={setSearch} />
        <TagsSlider
          tags={tags}
          currentTagName={currentTagName}
          setCurrentTagName={setCurrentTagName}
        />
        {contains}
      </div>
    </div>
  )
}

export default ItemsPage
