import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems'));
        return savedItems || [];
    });
    
    const addToCart = (product) => {
        setCartItems((prevProducts) => [...prevProducts, {...product, quantity: 1}]);
    }

    const increaseQuantity = (id) => {
        setCartItems((prevProducts) => 
        prevProducts.map((item) => item.id === id ? {...item, quantity: item.quantity + 1} : item))
    }

    const decreaseQuantity = (id) => {
        setCartItems((prevProducts) => 
        prevProducts.map((item) => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item))
    }

    const deleteCartItem = (id) => {
        setCartItems((prevProducts) => prevProducts.filter((item) => item.id !== id))
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, deleteCartItem }}>
            {children}
        </CartContext.Provider>
    )
}
