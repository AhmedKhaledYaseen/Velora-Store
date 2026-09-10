import TopHeader from './components/header/TopHeader'
import BtmHeader from './components/header/BtmHeader'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/productDetails/ProductDetails'
import Cart from './pages/cart/Cart'
import { Toaster } from 'react-hot-toast'

function App() {
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
