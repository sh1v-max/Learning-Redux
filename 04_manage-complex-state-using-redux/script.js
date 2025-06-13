import { createStore } from 'redux'
import { productsList } from './productsList'

const initialState = {
  products: productsList,
  cartItems: [],
  wishList: [],
}

// console.log(initialState.products)
const CART_ADD_ITEM = 'cart/addItem'
const CART_REMOVE_ITEM = 'cart/removeItem'

function reducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] }
    default:
      return state
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        ),
      }
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())

console.log(store)
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 1, quantity: 1 } })
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 12, quantity: 1 } })
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 6, quantity: 1 } })
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 9, quantity: 1 } })
store.dispatch({ type: CART_REMOVE_ITEM, payload: { productId: 6} })
store.dispatch({ type: CART_REMOVE_ITEM, payload: { productId: 9} })
