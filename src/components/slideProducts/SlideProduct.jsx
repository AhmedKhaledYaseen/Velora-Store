import Product from './Product'
import './slideProduct.css'

function SlideProduct() {
    return (
        <div>
            <div className='slide-products slide'>
                <div className="container">
                    <div className="top-slide">
                        <h2>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
                    </div>

                    <Product />
                </div>
            </div>
        </div>
    )
}

export default SlideProduct