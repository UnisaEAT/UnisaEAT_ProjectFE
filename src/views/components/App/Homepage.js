import React from 'react'
import {Carousel, Image} from "react-bootstrap";
import {useState} from "react";
import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
import mensa5 from "../../assets/mensa5.jpg"
import Chat from "../gestioneChat/chat";

import "../../styles/AppStyle/Homepage.css"
function Homepage() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item className="carouselInnerContainer">
                    <Image
                        className="d-block w-100"

                        height="600px"
                        src={slide1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Vivi il campus</h3>
                        <p>App unisaEAT</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carouselInnerContainer">
                    <Image
                        className="d-block w-100"
                        height="600px"
                        src={slide2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>UnisaEAT</h3>
                        <p>Seconda slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={mensa5}
                        height="600px"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Il campus UNISA</h3>
                        <p>vivi il campus</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Chat/>
        </div>

    );
}

export default Homepage;