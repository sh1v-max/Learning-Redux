## ✅ What is `react-redux`?

**`react-redux` is the glue** that connects **React** and **Redux**.
It gives us:

| Feature       | Purpose                                                      |
| ------------- | ------------------------------------------------------------ |
| `<Provider>`  | Makes the store available to all components                  |
| `useSelector` | Lets you *read* data (e.g., cart items) from the Redux store |
| `useDispatch` | Lets you *change* data (e.g., add/remove product from cart)  |


## 🧱 Without `react-redux`, you'd have to:

* Manually subscribe to the Redux store
* Manually force re-renders
* Manually pass state as props through components

😩 That's slow and painful.
`react-redux` automates and simplifies all that.


## 📦 Redux Store (the global state)

Imagine a simple cart slice like this:

```js
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); // add product to cart
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
```

This slice manages all your cart logic.


## 🧠 Now, how does `react-redux` help?

### ✅ 1. `Provider` – Make the store global

```jsx
// main.jsx
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

<Provider store={store}>
  <App />
</Provider>
```

Now your **Redux store is available to all components** in your app.


### ✅ 2. `useSelector` – Read data (e.g., cart items)

```jsx
// CartPage.jsx
import { useSelector } from 'react-redux';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

`useSelector` **automatically subscribes to the Redux store** and updates the component when state changes.


### ✅ 3. `useDispatch` – Add/Remove from cart

```jsx
// Product.jsx
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.title}</h3>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};
```

This lets any component **send actions to Redux** to modify the global state.


## 🎯 Summary with Real-Life Mapping:

| Concept         | eCommerce Analogy                                                  |
| --------------- | ------------------------------------------------------------------ |
| Redux Store     | The warehouse that stores all your products and cart               |
| `<Provider>`    | The delivery service that makes the warehouse available everywhere |
| `useSelector()` | A scanner that shows what's currently in the warehouse             |
| `useDispatch()` | A worker that updates the warehouse inventory                      |
