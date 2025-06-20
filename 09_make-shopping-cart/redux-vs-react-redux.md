## 🧠 Redux vs React-Redux — What's the Difference?

### 🔴 `redux` (Library)

* **What it is:** A **state management** library.
* **What it does:** Manages and stores your application state in one centralized **global store**.
* **Works with:** Any JavaScript app (not just React).
* **Provides:** Core concepts like:

  * `createStore()`
  * `reducers`
  * `actions`
  * `dispatch`
  * `getState()`

➡️ Think of `redux` as the **engine** that controls your app’s state, but it doesn’t care about React.

---

### 🔵 `react-redux` (Binding)

* **What it is:** The **official React bindings** for Redux.
* **What it does:** Connects your Redux store to your **React components**.
* **Provides:**

  * `<Provider store={...}>` → wraps your app so all components can access the store
  * `useSelector()` → lets components **read** from the store
  * `useDispatch()` → lets components **send actions** to the store

➡️ `react-redux` is the **glue** that makes Redux work with React’s component system.

---

## 🧩 Analogy

* 🧠 `redux` = The **brain** of your app (logic, memory, decisions)
* 🔌 `react-redux` = The **wires and plugs** that connect the brain to the React body

---

## ✅ Summary

| Feature          | redux                    | react-redux                                        |
| ---------------- | ------------------------ | -------------------------------------------------- |
| What it is       | State management library | React bindings for Redux                           |
| Works with       | Any JS app               | React apps only                                    |
| Provides         | Store, actions, reducers | Hooks (`useSelector`, `useDispatch`), `<Provider>` |
| Needed in React? | Yes                      | Yes, if using Redux in React                       |

---
