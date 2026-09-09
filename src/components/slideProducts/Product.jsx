import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";

function Product({ product }) {

  const { cartItems, addToCart } = useContext(CartContext);

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div>
      <div className={`product ${isInCart ? 'in-cart' : ''}`}>

        <Link to={`/product/${product.id}`}>
          <span className="status-cart"><FaCheck /> in cart</span>

          <div className="img-product">
            <img src={product.images[0]} alt={product.title} />
          </div>

          <p className="name-product">{product.title}</p>

          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
          </div>

          <p className='price'><span>$ {product.price}</span></p>
        </Link>

        <div className="icons">
          <span className="btn-addtocart" title="Add to Cart" onClick={() => addToCart(product)}><FaCartArrowDown /></span>
          <span title="Add to Wishlist"><FaRegHeart /></span>
          <span title="Share"><FaShare /></span>
        </div>

      </div>
    </div>
  )
}

export default Product