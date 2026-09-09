import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems'));
        return savedItems || [];
    });
    
    const addToCart = (product) => {
        setCartItems((prevProducts) => [...prevProducts, product]);
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}
