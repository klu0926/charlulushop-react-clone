import loadingPng from '../../images/loading.png'
function loadingIcon() {
  return (
    <span
      className='loadingIcon'
      style={{ backgroundImage: `url(${loadingPng})` }}></span>
  )
}

export default loadingIcon
