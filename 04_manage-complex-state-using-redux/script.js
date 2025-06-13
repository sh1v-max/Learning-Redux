import { createStore } from 'redux'
import { productsList } from './productsList'

const initialState = {
  products: productsList,
  cartItems: [],
  wishList: [],
}

// console.log(initialState.products)
const CART_ADD_ITEM = 'cart/addItem'

function reducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] }
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())

console.log(store)
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 1, quantity: 1 } })
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 12, quantity: 1 } })