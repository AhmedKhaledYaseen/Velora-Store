import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './productDetails.css'
import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import { FadeLoader } from "react-spinners";
import { useContext } from "react";
import { CartContext } from "../../components/cartContext/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
    const { id } = useParams();
    const { addToCart, cartItems } = useContext(CartContext);

    const navigate = useNavigate();

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

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(
            <div className='toast-wrapper'>
                <img src={product.images[0]} alt="" className='toast-img' />

                <div className="toast-content">
                    <strong>{product.title}</strong>
                    added to Cart
                    <div>
                        <button className='btn' onClick={() => navigate('/cart')}> View Cart</button>
                    </div>
                </div>
            </div>
            , { duration: 3500 }
        );
    };


    if (isLoading) return (
        <div className="loader">
            <FadeLoader color="var(--main-color)" />
        </div>
    )
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

                        <button className={`btn ${cartItems.find(item => item.id === product.id) ? "in-cart" : ""}`} onClick={handleAddToCart}>
                        {cartItems.find(item => item.id === product.id) ? "Item In Cart" : "Add To Cart"}
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

            {relLoading ? 
                <div className="loading_slider">
                    <FadeLoader color="var(--main-color)" />
                </div> : 
                <SlideProduct key={product.category} data={relProduct} title={product.category.replace("-", " ")} />
            }
        </>
    )
}

export default ProductDetails