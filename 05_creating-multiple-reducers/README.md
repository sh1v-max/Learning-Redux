## Using Multiple Reducers

### Goal:

Manage complex state by splitting logic into separate reducer functions:

* `items`: stores the list of items in the cart
* `quantity`: stores quantity of each item
* `wishlist`: stores items user wants but hasn't added to cart

---

### 1. Why Use Multiple Reducers?

* Keeps logic **modular and clean**
* Each reducer handles **only its piece** of state
* Makes debugging and testing easier

---

### 2. Reducer Functions

#### a. `itemsReducer`

* Manages the cart item list

```js
function itemsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}
```

* **Initial state:** empty array
* **Example Action:** `{ type: "ADD_ITEM", payload: { id: 1, name: "Phone" } }`

---

#### b. `quantityReducer`

* Tracks quantity for each item (using item ID as key)

```js
function quantityReducer(state = {}, action) {
  switch (action.type) {
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        [action.payload.id]: (state[action.payload.id] || 0) + 1
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        [action.payload.id]: Math.max((state[action.payload.id] || 1) - 1, 0)
      };
    default:
      return state;
  }
}
```

* **Initial state:** empty object
* **Example Action:** `{ type: "INCREMENT_QUANTITY", payload: { id: 1 } }`

---

#### c. `wishlistReducer`

* Manages items the user saved for later

```js
function wishlistReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}
```

* **Initial state:** empty array
* **Example Action:** `{ type: "ADD_TO_WISHLIST", payload: { id: 2, name: "Laptop" } }`

---

### 3. combineReducers Function

* Combines all reducers into a single `rootReducer`

```js
function combineReducers(reducers) {
  return function rootReducer(state = {}, action) {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}
```

* Iterates over each reducer
* Passes that slice of state and action to each reducer
* Builds new global state object

---

### 4. Creating the Store

```js
const rootReducer = combineReducers({
  items: itemsReducer,
  quantity: quantityReducer,
  wishlist: wishlistReducer
});

const store = myCreateStore(rootReducer);
```

* `myCreateStore` accepts the combined `rootReducer`
* Final `state` shape:

```js
{
  items: [...],
  quantity: { id1: count1, id2: count2 },
  wishlist: [...]
}
```

---

### 5. Dispatching Actions

```js
store.dispatch({ type: "ADD_ITEM", payload: { id: 1, name: "Phone" } });
store.dispatch({ type: "INCREMENT_QUANTITY", payload: { id: 1 } });
store.dispatch({ type: "ADD_TO_WISHLIST", payload: { id: 2, name: "Laptop" } });
```

* Each action is processed by **all reducers**, but only the relevant one updates state.

---

### 6. Accessing State

```js
store.getState(); 
// Example Output:
{
  items: [{ id: 1, name: "Phone" }],
  quantity: { 1: 1 },
  wishlist: [{ id: 2, name: "Laptop" }]
}
```

---

### Summary

| Concept           | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| Separate Reducers | Clean code, each manages one part of state            |
| combineReducers   | Merges reducers into a rootReducer                    |
| State Shape       | Matches the keys provided to combineReducers          |
| Dispatch          | Sends action to all reducers, each handles or ignores |
