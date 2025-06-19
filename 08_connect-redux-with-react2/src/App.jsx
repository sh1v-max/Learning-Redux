import React from 'react'
import Product from './components/Product'
import {store} from './store/index'
import './App.css'
import { useSelector } from 'react-redux'


console.log(store)
console.log(store.getState())
console.log(store.getState().products)

export default function App() {
  const productsList = useSelector((state) => state.products)
  return (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  )
}
