# Redux Basics

---

### What is Redux?

* **Redux** is a predictable state management library for JavaScript applications.
* It helps you **manage application state** in a centralized, consistent way.
* Redux works well especially for apps with complex state that needs to be shared or synchronized across many components.
* Inspired by the **Flux architecture** but simpler and with a strict unidirectional data flow.

---

### Why use Redux? (Uses / Benefits)

* **Single Source of Truth:** The entire app state lives in one place — the Redux store.
* **Predictable State Changes:** State updates happen only through **actions** and a pure **reducer** function, making changes explicit and traceable.
* **Easier Debugging:** You can track every action and state change, useful for debugging and time-travel debugging.
* **Centralized Logic:** Keeps all state logic in one place instead of scattered across components.
* **Works well with UI libraries:** React, Vue, Angular, or even plain JS.
* **Enables advanced patterns:** Middleware for async calls, logging, crash reporting, etc.

---

### Core Concepts

| Term          | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| **Store**     | The object holding the app’s entire state.                           |
| **State**     | The current data held by the store (often an object).                |
| **Action**    | A plain object describing *what happened* (`{ type: 'INCREMENT' }`). |
| **Reducer**   | A pure function that takes state & action, returns new state.        |
| **Dispatch**  | A method to send an action to the store.                             |
| **Subscribe** | A method to listen for state changes and react (e.g., update UI).    |

---

### How does Redux flow work?

1. The UI dispatches an **action** describing what happened.
2. The **store** passes current state and the action to the **reducer**.
3. The **reducer** calculates and returns the new state.
4. The store updates its internal state.
5. All **subscribers** are notified, so the UI or other parts can update.

---

### Common Imports from Redux

When you import from `'redux'`, these are the usual core functions you get:

| Import               | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `createStore`        | Creates the Redux store to hold state and dispatch actions. |
| `combineReducers`    | Combines multiple reducers into one root reducer.           |
| `applyMiddleware`    | Adds middleware like async logic or logging.                |
| `compose`            | Composes multiple store enhancers.                          |
| `bindActionCreators` | Wraps action creators to auto-dispatch them.                |

---

### Minimal Example (all in one file)

```js
import { createStore } from 'redux';

// Reducer: manages counter state
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

// Create store
const store = createStore(counterReducer);

// UI elements
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

// Render UI based on state
function render() {
  countElement.textContent = store.getState();
}

// Subscribe render function to state changes
store.subscribe(render);

// Initial render
render();

// Dispatch actions on button clicks
incrementBtn.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

decrementBtn.addEventListener('click', () => {
  store.dispatch({ type: 'DECREMENT' });
});
```

---

### Summary of Important Store Methods

| Method              | What it Does                                    |
| ------------------- | ----------------------------------------------- |
| `store.getState()`  | Returns the current state                       |
| `store.dispatch()`  | Sends an action to update state                 |
| `store.subscribe()` | Adds a listener function to run on state change |

---
