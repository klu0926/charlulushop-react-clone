import { useParams } from 'react-router-dom'

function ItemPage() {
  const { itemId } = useParams()

  return (
    <div className='page'>
      <div className='RWD-container'>
        <h1>Single Item Page</h1>
        <h2>ItemId : {itemId}</h2>
      </div>
    </div>
  )
}

export default ItemPage
