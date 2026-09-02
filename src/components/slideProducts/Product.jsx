import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";

function Product({ product }) {

  console.log(product);


  return (
    <div>
      <div className='product'>

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

        <div className="icons">
          <span><FaCartArrowDown /></span>
          <span><FaRegHeart /></span>
          <span><FaShare /></span>
        </div>

      </div>
    </div>
  )
}

export default Product