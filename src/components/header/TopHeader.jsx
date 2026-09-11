import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css'
import { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";
import SearchBox from "./SearchBox";




function TopHeader() {

  const { cartItems } = useContext(CartContext);

  return (
    <div className="top-header">
      <Link to="/">
        <img src="../assets/img/logo.png" alt="logo.png" />
      </Link>

      <SearchBox />

      <div className="icons-box">
        <div className="icon">
          <FaRegHeart />
          <span className="count">0</span>
        </div>

        <Link to="/cart">
          <div className="icon">
            <TiShoppingCart />
            <span className="count">{cartItems.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopHeader