import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

function Product({ product }) {

  console.log(product);


  return (
    <div>
      <div className='product'>

        <Link to={`/product/${product.id}`}>
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
          <span title="Add to Cart"><FaCartArrowDown /></span>
          <span title="Add to Wishlist"><FaRegHeart /></span>
          <span title="Share"><FaShare /></span>
        </div>

      </div>
    </div>
  )
}

export default Product