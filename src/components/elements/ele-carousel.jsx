import React from 'react'
import ActionUtil from '@/nice-router/action-util'

import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Swiper, SwiperItem, Video, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'

import './styles.scss'

function EleCarousel(props) {
  const {
    items,
    autoplay,
    interval,
    duration,
    circular,
    indicatorColor,
    indicatorActiveColor,
    indicatorDots,
    customStyle,
    className,
    mode,
  } = props

  const handleClick = async (item = {}) => {
    const { videoUrl = '', imageUrl } = item
    console.log('carousel viewed', item)

    if (isNotEmpty(videoUrl)) {
      return
    }

    if (ActionUtil.isActionLike(item)) {
      NavigationService.view(item)
      return
    }

    if (isEmpty(videoUrl) && isNotEmpty(imageUrl)) {
      await Taro.previewImage({ urls: [imageUrl] })
    }
  }

  const showDots = indicatorDots === null ? items.length > 1 : indicatorDots

  const list = items.map((it, idx) => ({ ...it, key: idx })) // 临时处理，taro bug，用原来的id，部分图展示不出来

  const rootClass = classNames('ele-carousel', className)
  return (
    <View className={rootClass} style={customStyle}>
      <Swiper
        autoplay={autoplay}
        interval={interval}
        duration={duration}
        circular={circular}
        indicatorColor={indicatorColor}
        indicatorActiveColor={indicatorActiveColor}
        indicatorDots={showDots}
        className='ele-carousel-item'
      >
        {list.map((it) => {
          const { videoUrl = '', imageUrl, key } = it
          return (
            <SwiperItem key={key} onClick={handleClick.bind(this, it)} className='ele-carousel-item'>
              {videoUrl.length > 0 ? (
                <Video
                  className='ele-carousel-item'
                  src={videoUrl}
                  controls
                  autoplay={it.autoplay}
                  poster={imageUrl}
                  initialTime='0'
                  loop
                  muted={false}
                />
              ) : (
                <ServerImage className='ele-carousel-item' src={it.imageUrl} mode={mode} size='large' />
              )}
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

EleCarousel.defaultProps = {
  items: [],
  autoplay: false,
  interval: 5000,
  duration: 1000,
  circular: true,
  indicatorColor: 'rgba(255, 255, 255, 0.6)',
  indicatorActiveColor: '#fff',
  indicatorDots: null,
  customStyle: {},
  className: null,
  mode: 'aspectFill',
}

export default EleCarousel
