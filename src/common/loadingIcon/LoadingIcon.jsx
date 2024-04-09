import loadingPng from '../../images/loading.png'
function LoadingIcon({ size = 25 }) {
  return (
    <span
      className='loadingIcon'
      style={{
        backgroundImage: `url(${loadingPng})`,
        width: `${size}px`,
        height: `${size}px`,
      }}></span>
  )
}

export default LoadingIcon
