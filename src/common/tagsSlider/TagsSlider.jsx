import style from './tagsSlider.module.scss'
import LoadingIcon from '../loadingIcon/LoadingIcon'

function TagsSlider({
  tags,
  currentTagName,
  setCurrentTagName,
  isLoading,
  isError,
}) {
  function handleOnclick(tagName) {
    setCurrentTagName(tagName)
  }

  // [All] tag
  function AllTag() {
    let allTagClass = style.tag
    if (!currentTagName) {
      allTagClass = allTagClass + ' ' + style.current
    }
    return (
      <span className={allTagClass} key='all' onClick={() => handleOnclick('')}>
        All
      </span>
    )
  }
  // 內容
  let tagsContent = ''

  if (isLoading) {
    tagsContent = (
      <span>
        <LoadingIcon />
      </span>
    )
  } else if (isError) {
    tagsContent = <span>{isError.message}</span>
  } else if (tags) {
    tagsContent =
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
            {tag.name} | {tag.itemsCount}
          </span>
        )
      }) || []
  }

  return (
    <div className={style.tagsSlider}>
      <AllTag />
      {tagsContent}
    </div>
  )
}

export default TagsSlider
