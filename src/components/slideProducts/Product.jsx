import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";
import toast from "react-hot-toast";

function Product({ product: propProduct, item }) {
  const product = propProduct || item;
  const { cartItems, addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  if (!product) return null;

  const isInCart = cartItems?.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(
      <div className='toast-wrapper'>
        <img src={product.images[0]} alt="" className='toast-img' />

        <div className="toast-content">
          <strong>{product.title}</strong>
          added to Cart
          <div>
            <button className='btn' onClick={() => navigate('/cart')}> View Cart</button>
          </div>
        </div>
      </div>
      , { duration: 3500 }
    );
  };

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
          <span className="btn-addtocart" title="Add to Cart" onClick={handleAddToCart}><FaCartArrowDown /></span>
          <span title="Add to Wishlist"><FaRegHeart /></span>
          <span title="Share"><FaShare /></span>
        </div>

      </div>
    </div>
  )
}

export default Product