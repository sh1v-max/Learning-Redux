# 🧠 How to Use Redux Toolkit in Your React Project (with Cart Functionality)



## 🌱 STEP 1: Create Your Vite + React Project (if not already)

```bash
npm create vite@latest my-redux-app -- --template react
cd my-redux-app
npm install
```

Test it:

```bash
npm run dev
```

---

## 📦 STEP 2: Install Redux Toolkit and React-Redux

Install both packages:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 🧱 STEP 3: Set Up Redux Store

### 🔹 Create the folder structure:

```bash
mkdir -p src/store
```

### 📄 Create `src/store/store.js`:

```js
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

> `configureStore` automatically sets up Redux DevTools and includes helpful defaults like `redux-thunk`.

---

## 🧩 STEP 4: Create a Redux Slice (Cart Example)

### 🔹 Create a folder for cart feature:

```bash
mkdir -p src/features/cart
```

### 📄 Create `src/features/cart/cartSlice.js`:

```js
// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

> Each reducer mutates the state *immutably under the hood* using Immer.js. So `state.items.push(...)` is okay.

---

## 🧠 STEP 5: Provide Redux Store to Your App

### 📄 Edit `main.jsx`:

```js
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## 🛒 STEP 6: Use Redux State and Actions in Components

### 🔄 Import Redux hooks:

```bash
import { useSelector, useDispatch } from 'react-redux';
```

---

### 📄 Create `src/components/CartComponent.jsx`:

```js
// src/components/CartComponent.jsx
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../features/cart/cartSlice';

export default function CartComponent() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: `Item-${Math.floor(Math.random() * 100)}`,
    };
    dispatch(addItem(newItem));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', marginTop: '2rem' }}>
      <h2>🛒 Cart</h2>
      <button onClick={handleAdd}>➕ Add Random Item</button>
      <button onClick={() => dispatch(clearCart())}>🧹 Clear Cart</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => handleRemove(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🧪 STEP 7: Use `CartComponent` in `App.jsx`

```js
// src/App.jsx
import CartComponent from './components/CartComponent';

function App() {
  return (
    <div className="App">
      <h1>🛍 Redux Cart Example</h1>
      <CartComponent />
    </div>
  );
}

export default App;
```

---

## 🧪 Optional: Check Redux DevTools

Open your browser's DevTools → Redux tab → inspect actions/state

If it's not working:

* Use Chrome
* Install Redux DevTools extension: [https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## 🛠️ ADVANCED: Add Quantity in Cart

Modify your `addItem` to check for duplicates and increase quantity:

```js
addItem: (state, action) => {
  const item = state.items.find(i => i.id === action.payload.id);
  if (item) {
    item.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }
}
```

> This pattern is useful in Swiggy/Zomato-style carts where the same dish can be added multiple times.

---

## 📁 Final Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── components/
│   └── CartComponent.jsx
├── features/
│   └── cart/
│       └── cartSlice.js
├── store/
│   └── store.js
└── index.css
```

---

## ✅ Recap

| Step | Description                                       |
| ---- | ------------------------------------------------- |
| 1    | Create React project using Vite                   |
| 2    | Install Redux Toolkit and React-Redux             |
| 3    | Set up the `store` with `configureStore`          |
| 4    | Create a slice using `createSlice`                |
| 5    | Provide store with `<Provider>`                   |
| 6    | Use `useSelector` and `useDispatch` in components |
| 7    | Test in Redux DevTools                            |

---
