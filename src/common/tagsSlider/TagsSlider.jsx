import style from './tagsSlider.module.scss'
import { useState } from 'react'

function TagsSlider({
  itemsTotal,
  tags,
  currentTagName,
  setCurrentTagName,
  isLoading,
  isError,
}) {
  const [allItemsCount, setAllItemsCount] = useState(null)
  if (!allItemsCount && itemsTotal !== 0){
    setAllItemsCount(itemsTotal)
  }


  function handleOnclick(tagName) {
    setCurrentTagName(tagName)
  }
  // [All] tag
  function AllTag({ allItemsCount }) {
    let allTagClass = style.tag
    if (!currentTagName) {
      allTagClass = allTagClass + ' ' + style.current
    }
    return (
      <span className={allTagClass} key='all' onClick={() => handleOnclick('')}>
        全部 | {allItemsCount}
      </span>
    )
  }
  // 內容
  let tagsContent = ''
  // skeleton
  const tagsSkeleton = Array.from({ length: 7 }).map((_, index) => (
    <span key={`skeleton-${index}`} className={style.skeletonTag}></span>
  ))

  if (isLoading) {
    tagsContent = tagsSkeleton
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
      <AllTag allItemsCount={allItemsCount} />
      {tagsContent}
    </div>
  )
}

export default TagsSlider
