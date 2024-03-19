import { useParams } from 'react-router-dom'

function ItemPage() {
  const { itemId } = useParams()

  return (
    <div className='itemPage'>
      <h1>Single Item Page</h1>
      <h2>ItemId : {itemId}</h2>
    </div>
  )
}

export default ItemPage
