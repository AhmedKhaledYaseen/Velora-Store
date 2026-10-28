import './header.css'
import { MdMenu } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PiSignInFill } from "react-icons/pi";
import { FaUserPlus, FaRegHeart } from "react-icons/fa";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../authContext/AuthContext';

function BtmHeader() {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Accessories', path: '/accessories' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' },
  ];

  const location = useLocation();
  const { user, isAuthenticated, openLoginModal, logout } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Categories fetch error:", err));
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='btm-header'>
      <div className="container">
        <nav>
          <button className="nav-btn" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu />
            <span>Browse Category</span>
            {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>

          <div className={`category-list ${isOpen ? "active" : ""}`}>
            {categories.map((category, idx) => (
              <Link to={`/category/${category.slug}`} key={idx}>{category.name}</Link>
            ))}
          </div>

          <div className="header-pages">
            {pages.map((page, idx) => (
              <Link className={location.pathname === page.path ? "active" : ""} to={page.path} key={idx}>{page.title}</Link>
            ))}
          </div>

          <div className="login-register" ref={profileRef}>
            {isAuthenticated && user ? (
              <div className="user-profile-menu">
                <button
                  type="button"
                  className="user-profile-trigger"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="user-header-avatar"
                  />
                  <span className="user-header-name">
                    {user.name.split(" ")[0]}
                  </span>
                  {isProfileOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                <div className={`user-dropdown-menu ${isProfileOpen ? "active" : ""}`}>
                  <div className="dropdown-user-info">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                      alt={user.name}
                    />
                    <div className="info-text">
                      <span className="user-fullname">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <Link to="/favorites" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <FaRegHeart />
                    <span>My Wishlist</span>
                  </Link>

                  <Link to="/cart" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <FiShoppingBag />
                    <span>My Cart</span>
                  </Link>

                  <div className="dropdown-divider"></div>

                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                  >
                    <FiLogOut />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-actions-group">
                <button
                  type="button"
                  className="header-auth-btn"
                  onClick={openLoginModal}
                  title="Sign In"
                >
                  <PiSignInFill />
                  <span>Sign In</span>
                </button>
                <Link
                  to="/register"
                  className="header-auth-btn header-reg-btn"
                  title="Create Account"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default BtmHeader