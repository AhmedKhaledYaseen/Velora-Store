import { useEffect, useState } from "react";
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import { FadeLoader } from "react-spinners";
import "../category/categoryProducts.css";
import "./accessories.css";

function Accessories() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const [mobileRes, sportsRes] = await Promise.all([
          fetch("https://dummyjson.com/products/category/mobile-accessories"),
          fetch("https://dummyjson.com/products/category/sports-accessories"),
        ]);
        const mobileData = await mobileRes.json();
        const sportsData = await sportsRes.json();

        const combined = [
          ...(mobileData.products || []).map((p) => ({ ...p, accType: "mobile" })),
          ...(sportsData.products || []).map((p) => ({ ...p, accType: "sports" })),
        ];
        setProducts(combined);
      } catch (err) {
        console.error("Error fetching accessories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.accType === activeTab);

  return (
    <PageTransition>
      <div className="category_products">
        <div className="container">
          <div className="top_slide">
            <h2>Accessories : {filteredProducts.length}</h2>
            <p>Explore our premium collection of mobile & sports accessories</p>
          </div>

          <div className="accessories_tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All Accessories
            </button>
            <button
              className={activeTab === "mobile" ? "active" : ""}
              onClick={() => setActiveTab("mobile")}
            >
              Mobile Accessories
            </button>
            <button
              className={activeTab === "sports" ? "active" : ""}
              onClick={() => setActiveTab("sports")}
            >
              Sports Accessories
            </button>
          </div>

          {loading ? (
            <div className="loader">
              <FadeLoader color="var(--main-color)" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products">
              {filteredProducts.map((item) => (
                <Product product={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <p style={{ fontSize: "18px", color: "var(--p-color)" }}>
                No accessories found.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Accessories;
