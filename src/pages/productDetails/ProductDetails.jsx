import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './productDetails.css'
import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import SlideProduct from "../../components/slideProducts/SlideProduct";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [relProduct, setRelProduct] = useState([]);
    const [relLoading, setRelLoading] = useState(true);

    useEffect(() => {
        const dataFetching = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        dataFetching();
    }, [id])

    useEffect(() => {
        const dataFetching = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/category/${product?.category}`);
                const data = await res.json();
                setRelProduct(data.products);
                setRelLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        dataFetching();
    }, [product?.category])


    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
        <>
            <div className="item_details">
                <div className="container">

                <div className="imgs_item">
                    <div className="big_img">
                        <img id="big_img" src={product.images[0]} alt={product.title} />
                    </div>

                    <div className="sm_img">
                        {product.images.map((img, index) => (
                            <div className="img_div_sm" key={index}>
                                <img
                                    src={img}
                                    alt={product.title}
                                    onClick={() => (document.getElementById("big_img").src = img)}
                                />
                            </div>
                        ))}
                    </div>
                </div>


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

                    <button className="btn">
                        Add To Cart
                        <TiShoppingCart />
                    </button>

                    <div className="icons">
                        <span>
                            <FaRegHeart />
                        </span>
                        <span>
                            <FaShare />
                        </span>
                    </div>
                </div>
                        
                
                

                </div>
            </div>

            {relLoading ? <div>Loading...</div> : <SlideProduct key={product.category} data={relProduct} title={product.category.replace("-", " ")} />}
        </>
    )
}

export default ProductDetails