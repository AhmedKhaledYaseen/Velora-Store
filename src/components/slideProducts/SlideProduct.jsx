import Product from './Product'
import './slideProduct.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

function SlideProduct(props) {
    return (
        <div>
            <div className='slide-products slide'>
                <div className="container">
                    <div className="top-slide">
                        <h2>{props.title}</h2>
                        <p>Add best selling products to weekly lineup</p>
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
                        {props.data.map((product) => (
                            <SwiperSlide key={product.id}><Product key={product.id} product={product} /></SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default SlideProduct