import { useState } from 'react'

function useSearch() {
  const [search, setSearch] = useState(null)
  return {search, setSearch}
}

export default useSearch
