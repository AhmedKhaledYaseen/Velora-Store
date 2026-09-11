import { useContext } from "react";
import { FavoritesContext } from "../../components/favoritesContext/FavoritesContext";
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import "../category/categoryProducts.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <PageTransition>
      <div className="category_products">
        <div className="container">
          <div className="top_slide">
            <h2>Your Favorites</h2>
          </div>

          {favorites.length > 0 ? (
            <div className="products">
              {favorites.map((item) => (
                <Product product={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <p style={{ fontSize: "18px", color: "var(--p-color)" }}>
                You have no favorite products yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
