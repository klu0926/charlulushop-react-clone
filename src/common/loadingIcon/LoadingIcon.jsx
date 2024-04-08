import loadingPng from '../../images/loading.png'
function LoadingIcon() {
  return (
    <span
      className='loadingIcon'
      style={{ backgroundImage: `url(${loadingPng})` }}></span>
  )
}

export default LoadingIcon
