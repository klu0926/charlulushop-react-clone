import style from './youtubeDiv.module.scss'
import { useState, useEffect } from 'react'
import url from '../../data/url'

const serverYoutubeUrl = url.server + '/youtubes/newest'

function YoutubeDiv() {
  const [index, setIndex] = useState(0)
  const [videos, setVideo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  function handleVideoClick(e) {
    const currentIndex = e.target.dataset.id
    if (currentIndex !== undefined) {
      setIndex(currentIndex)
    }
  }

  useEffect(() => {
    // abort controller
    const abortController = new AbortController()

    // fetch
    async function fetchYoutubeVideos() {
      try {
        setIsError(null)
        setIsLoading(true)
        // set error
        // set loading
        const response = await fetch(serverYoutubeUrl, {
          signal: abortController.signal,
        })

        if (!response.ok) throw new Error(response.statusText)
        const json = await response.json()

        if (!json.ok) throw new Error(json.error)
        setVideo(json.data)
      } catch (err) {
        setIsError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchYoutubeVideos()

    // clean up
    return () => {
      abortController.abort()
      setIsError(null)
    }
  }, [])

  // skeleton
  function Skeleton() {
    return (
      <>
        <div className={style.skeletonContainer}>
          <div className={style.skeletonImageDiv}></div>
          <div className={style.skeletonInfo}>
            <span className={style.skeletonInfoTitle}></span>
            <span className={style.skeletonInfoTitle2}></span>
            <span className={style.skeletonInfoDes}></span>
            <span className={style.skeletonInfoDes}></span>
            <span className={style.skeletonInfoDes}></span>
            <span className={style.skeletonInfoDate}></span>
          </div>
        </div>
        <div className={style.SkeletonVideoDivContainers}>
          <div className={style.skeletonImageHolder}></div>
          <div className={style.skeletonImageHolder}></div>
          <div className={style.skeletonImageHolder}></div>
          <div className={style.skeletonImageHolder}></div>
          <div className={style.skeletonImageHolder}></div>
        </div>
      </>
    )
  }

  // 內容
  // isError或是沒有影片就不顯示
  let content = null
  if (isLoading) {
    content = <Skeleton />
  } else if (isError) {
    content = (
      <div className={style.errorContainer}>
        <p>Video loader error: {isError}</p>
      </div>
    )
  } else if (videos && videos.length !== 0) {
    content = (
      <>
        <div className={style.youtubeDiv}>
          <span className={style.tip}>逛累了嗎？ 休息一下看個影片吧！</span>
          <div className={style.mainVideoContainer}>
            <div className={style.videoBox}>
              <iframe
                className={style.iframe}
                src={`https://www.youtube.com/embed/${videos[index].videoId}?si=mcCYwDK2GsBIZcqK`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                loading='lazy'></iframe>
            </div>
            <div className={style.infoBox}>
              <span className={style.infoTitle}>{videos[index].title}</span>
              <span className={style.infoDes}>{videos[index].description}</span>
              <span className={style.infoDate}>
                {videos[index].publishedAt}
              </span>
            </div>
          </div>
          <div className={style.videoThumbnailsDiv}>
            {videos.map((video, index) => {
              return (
                <div
                  key={`${video.videoId}`}
                  className={style.videoThumbnail}>
                  <img
                    src={video.thumbnails.medium.url}
                    alt='thumbnail'
                    onClick={handleVideoClick}
                    data-id={index}
                    loading='lazy'
                  />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

  return content
}

export default YoutubeDiv
