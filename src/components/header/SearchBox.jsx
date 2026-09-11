import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
        setSuggestions([]);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(
                    `https://dummyjson.com/products/search?q=${searchTerm}`
                );
                const data = await res.json();
                setSuggestions(data.products?.slice(0, 5) || []);
            } catch (error) {
                console.error("Search Error :", error);
                setSuggestions([]);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSuggestions([]);
    }, [location]);

    return (
        <div className="searchBox_container">
            <form onSubmit={handleSubmit} className="search-box">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchTerm}
                    placeholder="Search For Products"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>

            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((item) => (
                        <Link 
                            to={`/product/${item.id}`} 
                            key={item.id}
                            onClick={() => setSuggestions([])}
                        >
                            <li>
                                <img src={item.images[0]} alt={item.title} /> 
                                <span>{item.title}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;
