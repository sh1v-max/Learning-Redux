### 🔧 Purpose of `combineReducers`

`combineReducers` is a utility function that:

* Takes **multiple reducer functions** (for different parts of state)
* Returns a **single root reducer**
* This root reducer delegates to the smaller reducers based on keys
* This allows Redux-like state management in a clean and modular way


### ✅ Code Breakdown

```js
function combineReducers(reducers) {
```

* This is a higher-order function.
* It takes an object called `reducers` as an argument.
* Example of `reducers`:

  ```js
  {
    products: productsReducer,
    cartItems: cartItemsReducer,
    wishList: wishListReducer
  }
  ```


```js
  const reducerKeys = Object.keys(reducers)
```

* `Object.keys(reducers)` gives you an array of keys:

  ```js
  ['products', 'cartItems', 'wishList']
  ```
* These keys represent the **namespaces/slices of the state**.
* You’ll loop over these keys to call the correct reducer for each piece.


```js
  return function (state = {}, action) {
```

* This returns the **combined root reducer function**.
* It accepts the global `state` and `action`, just like a normal reducer.
* `state` is the entire app's state, with slices like:

  ```js
  {
    products: [...],
    cartItems: [...],
    wishList: [...]
  }
  ```


```js
    const nextState = {}
```

* Prepare an empty object to hold the **new state after this action**.
* This will be returned at the end.


```js
    for (let i = 0; i < reducerKeys.length; i++) {
```

* Loop through all reducer keys (like `'products'`, `'cartItems'`, etc.).


```js
      const key = reducerKeys[i]
```

* Get the current key (e.g., `'products'`).


```js
      const reducer = reducers[key]
```

* Retrieve the corresponding reducer function for that key.
  Example: `reducer = productsReducer`


```js
      const previousStateForKey = state[key]
```

* Get the current state for that key.
  Example: if `key === 'products'`, then get `state.products`.


```js
      const nextStateForKey = reducer(previousStateForKey, action)
```

* Call the **reducer** for that key with its own slice of state and the action.
* This returns the updated state for that slice.


```js
      nextState[key] = nextStateForKey
```

* Store the new state slice under its corresponding key in the `nextState` object.


```js
    }

    return nextState
  }
}
```

* Once all keys are processed, return the `nextState` — this becomes the **new global state** after the action is handled.


### 🔄 What This Code Is Doing:

Let’s say you call:

```js
const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartItemsReducer,
  wishList: wishListReducer
});

const newState = rootReducer(prevState, someAction);
```

Then the process is:

1. Loop over `products`, `cartItems`, `wishList`
2. For each:

   * Call the correct reducer
   * Pass only its slice of state
   * Store the result in the right spot of `nextState`
3. Return the updated global state


### 🧠 Why This Approach Works

* Each reducer is only responsible for its **own state**.
* The combined function puts together the global state.
* This is the exact concept Redux uses under the hood.


### TL;DR

| Line / Concept                   | Explanation                                      |
| -------------------------------- | ------------------------------------------------ |
| `Object.keys(reducers)`          | Gets the names of state slices                   |
| `reducer(previousState, action)` | Each reducer handles only its piece of the state |
| `nextState[key] = ...`           | Collects updated state for each slice            |
| `return nextState`               | Returns the full updated global state            |

