import style from './search.module.scss'
import { useState } from 'react'

function Search({ onInput }) {
  function handleReset() {
    const input = document.querySelector('#searchInput')
    if (input) {
      input.value = ''
    }
  }

  function handleOnInput(e) {
    if (onInput) {
      onInput(e.target.value)
    }
  }

  return (
    <div className={style.searchContainer}>
      <input
        id='searchInput'
        className={style.searchInput}
        type='text'
        placeholder='找找看...'
        onInput={handleOnInput}
      />
      <button className={style.reset} type='button' onClick={handleReset}>
        x
      </button>
    </div>
  )
}

export default Search
