import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css'




function TopHeader() {
  return (
    <div className="top-header">
      <Link to="/">
        <img src="../assets/img/logo.png" alt="logo.png" />
      </Link>

      <form action="" className="search-box">
        <input type="text" name="search" id="search" placeholder="Search for products" />
        <button type="submit"><FaSearch /></button>
      </form>

      <div className="icons-box">
        <div className="icon">
          <FaRegHeart />
          <span className="count">0</span>
        </div>

        <div className="icon">
          <TiShoppingCart />
          <span className="count">0</span>
        </div>
      </div>
    </div>
  )
}

export default TopHeader