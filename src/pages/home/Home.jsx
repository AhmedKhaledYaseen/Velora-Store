import HeroSlider from "../../components/HeroSlider"
import './home.css'
import SlideProduct from "../../components/slideProducts/SlideProduct"
import { useEffect, useState } from "react";

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
    <>
      <HeroSlider />
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        categories.map(category => (
          <SlideProduct key={category} data={products[category]} title={category.replace('-', ' ')} />
          ))
      )}
    </>
  )
}

export default Home