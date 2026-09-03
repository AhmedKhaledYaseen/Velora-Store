import TopHeader from './components/header/TopHeader'
import BtmHeader from './components/header/BtmHeader'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/productDetails/ProductDetails'

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
