import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './productDetails.css'
import SlideProduct from "../../components/slideProducts/SlideProduct";
import { FadeLoader } from "react-spinners";
import { useContext } from "react";
import { CartContext } from "../../components/cartContext/CartContext";
import toast from "react-hot-toast";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

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
        <PageTransition>
            {isLoading ?
                <div className="loader">
                    <FadeLoader color="var(--main-color)" />
                </div> :
                <div className="item_details">
                    <div className="container">

                        <ProductImages product={product} />
                        <ProductInfo product={product} handleAddToCart={handleAddToCart} cartItems={cartItems} />
                    </div>
                </div>
            }


            {relLoading ?
                <div className="loading_slider">
                    <FadeLoader color="var(--main-color)" />
                </div> :
                <SlideProduct key={product.category} data={relProduct} title={product.category.replace("-", " ")} />
            }
        </PageTransition>
    )
}

export default ProductDetails