import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './categoryProducts.css'
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import { FadeLoader } from "react-spinners";

function CategoryProducts() {

    const { category } = useParams();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => setProducts(data.products || []))
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [category])

    return (
        <PageTransition key={category}>
            <div className="category_products">
                {loading ? (
                    <div className="loader">
                        <FadeLoader color="var(--main-color)" />
                    </div>
                ) : (
                    <div className="container">
                        <div className="top_slide">
                            <h2>{category?.replace("-", " ")} : {products.length}</h2>
                            <p>Add best selling products to weekly lineup</p>
                        </div>

                        <div className="products">
                            {products.map((item) => (
                                <Product product={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    )
}

export default CategoryProducts