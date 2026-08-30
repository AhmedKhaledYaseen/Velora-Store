import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";

function Product() {
  return (
    <div>
      <div className='product'>

        <div className="img-product">
          <img src="https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp" alt="" />
        </div>

        <p className="name-product">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis possimus tempore nihil ut corrupti veniam architecto consectetur omnis enim perspiciatis quia velit, recusandae reiciendis, debitis culpa? A corporis deleniti enim!</p>

        <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
        </div>

        <p className='price'><span>$ 1000</span></p>

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