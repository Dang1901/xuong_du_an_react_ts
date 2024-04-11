import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsList from './components/ProductsList'
import LayoutAmin from './components/LayoutAmin'
import ProductsAdd from './components/ProductsAdd'
import ProductsEdit from './components/ProductsEdit'
import Sigin from './components/pages/Sigin'
import Sigup from './components/pages/Sigup'
import WebLayout from './components/Layouts/WebLayout'
import HomePage from './components/pages/Home'
import ProductDiteil from './components/pages/ProductDiteil'
import CartPage from './components/pages/Cart'
import { Shop } from './components'
import OrderPage from './components/pages/order'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<WebLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='products/:id' element={<ProductDiteil />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />


        </Route>


        <Route path="admin" element={<LayoutAmin />}>
          <Route index element={<ProductsList />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<ProductsAdd />} />
          <Route path="products/:id/edit" element={<ProductsEdit />} />
        </Route>
        <Route path="signin" element={<Sigin />} />
        <Route path="signup" element={<Sigup />} />


      </Routes>

    </>
  )
}

export default App
