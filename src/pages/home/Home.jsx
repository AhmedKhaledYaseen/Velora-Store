import HeroSlider from "../../components/HeroSlider"
import './home.css'
import SlideProduct from "../../components/slideProducts/SlideProduct"
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import PageTransition from "../../components/PageTransition";

function Home() {

  const categories = [
    "smartphones",
    "mobile-accessories",
    "laptops",
    "tablets",
    "mens-watches",
    "sports-accessories",
  ]

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFetching = await Promise.all(
          categories.map(async (category) => {
            const result = await fetch(`https://dummyjson.com/products/category/${category}`)
            const data = await result.json()
            return { [category]: data.products }
          })
        )

        const productsData = Object.assign({}, ...dataFetching);

        setProducts(productsData);


      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <PageTransition>
        <HeroSlider />
        {isLoading ? (
          categories.map(category => (
            <div className="loading_slider">
              <FadeLoader key={category} color="var(--main-color)" />
            </div>
          ))
        ) : (
          categories.map(category => (
            <SlideProduct key={category} data={products[category]} title={category.replace('-', ' ')} />
          ))
        )}
      </PageTransition>
  )
}

export default Home