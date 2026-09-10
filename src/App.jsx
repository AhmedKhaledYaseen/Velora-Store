import TopHeader from './components/header/TopHeader'
import BtmHeader from './components/header/BtmHeader'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProductDetails from './pages/productDetails/ProductDetails'
import Cart from './pages/cart/Cart'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import CategoryProducts from './pages/category/CategoryProducts'

function App() {
  const location = useLocation()

  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "var(--bg-color)",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />

      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
