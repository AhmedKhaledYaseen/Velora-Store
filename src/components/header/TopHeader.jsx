import { Link } from "react-router-dom";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css';
import { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";
import { FavoritesContext } from "../favoritesContext/FavoritesContext";
import { AuthContext } from "../authContext/AuthContext";
import SearchBox from "./SearchBox";

function TopHeader() {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { user, isAuthenticated, openLoginModal } = useContext(AuthContext);

  return (
    <div className="top-header">
      <Link to="/">
        <img src="../assets/img/logo.png" alt="logo.png" />
      </Link>

      <SearchBox />

      <div className="icons-box">
        {isAuthenticated && user ? (
          <div className="icon user-top-icon" title={`Logged in as ${user.name}`}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
              alt={user.name}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--main-color)",
              }}
            />
          </div>
        ) : (
          <div
            className="icon"
            onClick={openLoginModal}
            title="Sign In / Register"
            style={{ cursor: "pointer" }}
          >
            <FaRegUser />
          </div>
        )}

        <Link to="/favorites">
          <div className="icon">
            <FaRegHeart />
            <span className="count">{favorites.length}</span>
          </div>
        </Link>

        <Link to="/cart">
          <div className="icon">
            <TiShoppingCart />
            <span className="count">{cartItems.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopHeader;