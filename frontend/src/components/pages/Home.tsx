import React from 'react'
import ProductsList from '../ProductsListWeb'
import Header from '../Header'
import { Blog, Services, Shop } from '..'


const HomePage = () => {
  return (
    <div>
      <ProductsList />
      <Shop />
      <Services />
      <Blog />

    </div>
  )
}

export default HomePage
