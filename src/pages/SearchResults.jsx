import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Product from "../components/slideProducts/Product";
import { FadeLoader } from "react-spinners";

function SearchResults() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");

  const [loading, setLoading] = useState(true);

  console.log(results);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search Error :", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="category_products">
        {loading ? (
          <div className="loader">
            <FadeLoader color="var(--main-color)" />
          </div>
        ) : results.length > 0 ? (

          <div className="container">
            <div className="top_slide">
              <h2>
                Results for : {query}
              </h2>
            </div>

            <div className="products">
              {results.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>

        ) : <div className="container"><p>No Results found.</p></div>}
      </div>
    </PageTransition>
  );
}

export default SearchResults;