import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedItems = JSON.parse(localStorage.getItem('favorites'));
            return Array.isArray(savedItems) ? savedItems : [];
        } catch {
            return [];
        }
    });

    const isFavorite = (id) => {
        return favorites.some((item) => item.id === id);
    };

    const toggleFavorite = (product) => {
        if (!product) return;
        const exists = favorites.some((item) => item.id === product.id);
        if (exists) {
            toast.error(`${product.title} Removed from favorites`, { id: `fav-${product.id}` });
            setFavorites((prev) => prev.filter((item) => item.id !== product.id));
        } else {
            toast.success(`${product.title} added To favorites`, { id: `fav-${product.id}` });
            setFavorites((prev) => [...prev, product]);
        }
    };

    const removeFavorite = (id, title) => {
        if (title) {
            toast.error(`${title} Removed from favorites`, { id: `fav-${id}` });
        }
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
