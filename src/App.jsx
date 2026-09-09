import TopHeader from './components/header/TopHeader'
import BtmHeader from './components/header/BtmHeader'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/productDetails/ProductDetails'
import Cart from './pages/cart/Cart'

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
