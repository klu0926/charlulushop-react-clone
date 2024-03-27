import style from './search.module.scss'
import { useState, useEffect } from 'react'

function Search({ setSearch }) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    // 等0.5秒才會使用onInput來fetch資料
    const timeOut = setTimeout(() => {
      setSearch(inputValue)
    }, 500)
    // clear
    return () => clearTimeout(timeOut)
  }, [inputValue, setSearch])

  function handleReset() {
    const input = document.querySelector('#searchInput')
    if (input) {
      input.value = ''
    }
  }

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  return (
    <div className={style.searchWrapper}>
      <div className={style.searchContainer}>
        <input
          id='searchInput'
          className={style.searchInput}
          type='text'
          placeholder='找找看...'
          onInput={handleInput}
          autoComplete='off'
        />
        <button className={style.reset} type='button' onClick={handleReset}>
          x
        </button>
      </div>
    </div>
  )
}

export default Search
