import { createStore } from 'redux'
import { productsList } from './productsList'

const initialState = {
  products: productsList,
  cartItems: [],
  wishList: [],
}

console.log(initialState.products)

function reducer(state = initialState, action) {
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())

// console.log(store.getState())
