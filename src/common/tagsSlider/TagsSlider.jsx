import style from './tagsSlider.module.scss'
import url from '../../data/url'
const itemsUrl = url.server + '/items' // (queryTag=[tag name])

function TagsSlider({ tags, currentTagName, setCurrentTagName }) {
  function handleOnclick(tagName) {
    setCurrentTagName(tagName)
  }

  // All tags
  const tagsContent =
    tags?.map((tag) => {
      let tagClass = style.tag
      if (tag.name === currentTagName) {
        tagClass = tagClass + ' ' + style.current
      }
      return (
        <span
          className={tagClass}
          key={tag.id}
          onClick={() => handleOnclick(tag.name)}>
          {tag.name}
        </span>
      )
    }) || []


  // 'All' tag
  let allTagClass = style.tag
  if (!currentTagName) {
    allTagClass = allTagClass + ' ' + style.current
  }
  tagsContent.unshift(
    <span className={allTagClass} key='all' onClick={() => handleOnclick('')}>
      All
    </span>,
  )

  return <div className={style.tagsSlider}>{tagsContent}</div>
}

export default TagsSlider
