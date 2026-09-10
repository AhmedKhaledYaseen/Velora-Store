import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";

function ProductInfo({ product, handleAddToCart, cartItems }) {
    return (
        <div className="details_item">
            <h1 className="name">{product.title}</h1>
            <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
            </div>

            <p className="price">$ {product.price}</p>

            <h5>
                Availability: <span>{product.availabilityStatus}</span>
            </h5>
            <h5>
                Brand: <span>{product.brand}</span>
            </h5>
            <p className="desc">{product.description}</p>
            <h5 className="stock">
                <span>Hurry Up! Only {product.stock} products left in stock.</span>{" "}
            </h5>

            <button className={`btn ${cartItems.find(item => item.id === product.id) ? "in-cart" : ""}`} onClick={handleAddToCart}>
                {cartItems.find(item => item.id === product.id) ? "Item In Cart" : "Add To Cart"}
                <TiShoppingCart />
            </button>

            <div className="icons">
                <span>
                    <FaRegHeart />
                </span>
                <span>
                    <FaShare />
                </span>
            </div>
        </div>
    )
}

export default ProductInfo