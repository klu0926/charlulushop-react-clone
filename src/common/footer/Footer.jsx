import style from './footer.module.scss'
import url from '../../data/url'

function Footer() {
  return (
    <div className={style.footer}>
      <div className='RWD-container'>
        <span>CharluluStory 斷。捨。離</span>
        <div className={style.mediaContainer}>
          <a href='https://instagram.com/charlotte_journalday' target='_blank'>
            <img
              className={style.mediaIcon}
              src={`${url.client}/images/ig.png`}
              alt='ig'
            />
          </a>
          <a href='https://www.youtube.com/@CharluluStory' target='_black'>
            <img
              className={style.mediaIcon}
              src={`${url.client}/images/youtube.png`}
              alt='youtube'
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
