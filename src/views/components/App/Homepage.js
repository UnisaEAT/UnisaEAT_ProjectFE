import React, { useState } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import slide5 from '../../assets/slide5.jpg'
import slide6 from '../../assets/slide6.jpg'
import Chat from '../gestioneChat/chat'

import '../../styles/AppStyle/Homepage.css'
function Homepage () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div className='carousel-container'>
      <Carousel interval={3000} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className='carouselInnerContainer'>
          <Image
            className='d-block w-100'
            src={slide1}
            height='50%'
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item className='carouselInnerContainer'>
          <Image
            className='d-block w-100'
            src={slide5}
            height='50%'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Vivi il campus</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carouselInnerContainer'>
          <Image
            className='d-block w-100'
            src={slide6}
            height='50%'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>UnisaEAT</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className='d-block w-100'
            src={slide2}
            height='50%'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Il campus UNISA</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carouselInnerContainer'>
          <Image
            className='d-block w-100'
            src={slide3}
            height='50%'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Vivi il campus</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

  )
}

export default Homepage
