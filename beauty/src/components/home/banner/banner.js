import React from 'react';
import ReactDOM from 'react-dom';

import './swiper/swiper-4.2.0.min.scss';
import Swiper from './swiper/swiper-4.2.0.min';

class Banner extends React.Component{
    componentDidMount(){
        var swiper = new Swiper('.swiper-container', {
            // spaceBetween: 30,
            centeredSlides: true,
            loop: true,
             // slidesPerView: 2,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        })
    }
    render(){
        return (
            <div style={{width :'100%',height :'390px'}}>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img src="src/img/banner1.jpg" /></div>
                        <div className="swiper-slide"><img src="src/img/banner2.jpg" /></div>
                        <div className="swiper-slide"><img src="src/img/banner3.jpg" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}

export default Banner