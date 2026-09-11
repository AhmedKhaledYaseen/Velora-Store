import { FaRegHeart, FaHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { useContext } from "react";
import { FavoritesContext } from "../../components/favoritesContext/FavoritesContext";

function ProductInfo({ product, handleAddToCart, cartItems }) {
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    const isFav = isFavorite(product.id);
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
                <span 
                    className={isFav ? "in-fav" : ""} 
                    onClick={() => toggleFavorite(product)}
                    title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                    {isFav ? <FaHeart /> : <FaRegHeart />}
                </span>
                <span>
                    <FaShare />
                </span>
            </div>
        </div>
    )
}

export default ProductInfo