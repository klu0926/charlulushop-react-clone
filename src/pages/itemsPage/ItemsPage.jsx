import style from './itemsPage.module.scss'
import useFetchItems from '../../hooks/useFetchItems'
import ItemCard from '../../common/itemCard/ItemCard'

function ItemsPage() {
  const { items } = useFetchItems()

  console.log('items', items)

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
      <div className='RWD-container'>{contains}</div>
    </div>
  )
}

export default ItemsPage
