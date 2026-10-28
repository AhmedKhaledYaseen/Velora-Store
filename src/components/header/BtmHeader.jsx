import './header.css'
import { MdMenu } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PiSignInFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/react';

function BtmHeader() {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Accessories', path: '/accessories' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' },
  ];

  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Categories fetch error:", err));
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

          <div className="login-register">
            <Show when="signed-in">
              <div className="user-profile-menu clerk-profile-wrapper">
                <UserButton showName />
              </div>
            </Show>
            <Show when="signed-out">
              <div className="auth-actions-group">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="header-auth-btn"
                    title="Sign In"
                  >
                    <PiSignInFill />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="header-auth-btn header-reg-btn"
                    title="Create Account"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default BtmHeader
