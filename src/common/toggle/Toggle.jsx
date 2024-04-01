import style from './toggle.module.scss'
import { useState } from 'react'

function Toggle({
  initState = true,
  handleOnClick,
  onText = 'on',
  offText = 'off',
  disabled = false,
}) {
  const [isOn, setIsOn] = useState(initState)

  function mixHandleOnclick() {
    if (disabled) return
    if (typeof handleOnClick === 'function') {
      handleOnClick()
    }
    setIsOn((prev) => !prev)
  }

  let toggleText = ''
  if (isOn) {
    toggleText = onText
  } else {
    toggleText = offText
  }

  let toggleClass = style.sortToggle
  if (isOn) toggleClass += ` ${style.toggled}`
  if (disabled) toggleClass += ` ${style.disabled}`
  return (
    <div className={toggleClass} onClick={mixHandleOnclick}>
      <div className={style.sortText}>{toggleText}</div>
      <div className={style.sortCircle}></div>
    </div>
  )
}

export default Toggle
