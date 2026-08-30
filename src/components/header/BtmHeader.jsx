import './header.css'
import { MdMenu } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PiSignInFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';



function BtmHeader() {

  const pages = [
    {title: 'Home', path: '/'},
    {title: 'About', path: '/about'},
    {title: 'Accessories', path: '/accessories'},
    {title: 'Blog', path: '/blog'},
    {title: 'Contact', path: '/contact'},
  ]

  const location = useLocation();

  const [categories, setCategories] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])


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
              <Link to={category.slug} key={idx}>{category.name}</Link>
            ))}
          </div>

          <div className="header-pages">
            {pages.map((page, idx) => (
              <Link className={location.pathname === page.path ? "active" : ""} to={page.path} key={idx}>{page.title}</Link>
            ))}
          </div>

          <div className="login-register">
            <PiSignInFill />
            <FaUserPlus />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default BtmHeader