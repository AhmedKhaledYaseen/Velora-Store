import Product from './Product'
import './slideProduct.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

function SlideProduct() {
    return (
        <div>
            <div className='slide-products slide'>
                <div className="container">
                    <div className="top-slide">
                        <h2>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
                    </div>

                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={5}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Autoplay,Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                        <SwiperSlide><Product /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default SlideProduct