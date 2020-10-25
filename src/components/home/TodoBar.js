import React from 'react'
import SwiperCore, { Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'

import '../styles/ToolBar.css'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'

function Tool (props) {
  return (
    <div key={props.id} className='Tool'>
      <div className='Tool__content'>
        <span className='Tool-title'>Tarea</span>
        <p>I am a very simple card. I am good at containing small.</p>
      </div>
    </div>
  )
}

SwiperCore.use([Pagination, A11y])

export default function TodoBar (props) {
  return (
    <div className='ToolBar'>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {props.todo.map(item => (
          <SwiperSlide key={item}>
            <Tool id={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
