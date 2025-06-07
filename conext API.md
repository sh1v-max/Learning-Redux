# 🧠 What Is React Context API? (in detail)

The **Context API** in React is a built-in feature that allows you to **share data globally** across components without having to pass props manually at every level (avoids prop drilling).


### 🔧 **Problem It Solves: "Prop Drilling"**

Normally, to share data from a parent to a deeply nested child, you pass it down **through every component** in between — even if those middle components don't need it.

This is called **prop drilling**:

```jsx
<App>
  <A>
    <B>
      <C>
        <TargetComponent value={theme} />
      </C>
    </B>
  </A>
</App>
```

If only `TargetComponent` needs the value, passing it through `A`, `B`, and `C` is messy.

👎 Unnecessary.
👎 Hard to maintain.
👎 Clutters your components.


## ✅ Enter: React Context API

React's Context API allows you to:

* **Create** a centralized context object
* **Provide** data at a high level
* **Consume** that data anywhere below, without prop drilling

---

## 🧱 Step-by-Step Breakdown


### 📁 STEP 1: Create a Context

```js
import { createContext } from 'react';

// Create a context object
export const ThemeContext = createContext();
```


### 📦 STEP 2: Create a Provider Component

```jsx
// ThemeProvider.jsx
import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

> ✅ This component **wraps** your app and provides `theme` and `setTheme` to the component tree.


### 🧩 STEP 3: Wrap Your App with the Provider

```jsx
// main.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```


### 🎯 STEP 4: Use Context in Any Child Component

```jsx
// TargetComponent.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const TargetComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};

export default TargetComponent;
```

---

## 🧠 What’s Happening?

| Concept               | What it does                           |
| --------------------- | -------------------------------------- |
| `createContext()`     | Creates a context object               |
| `Context.Provider`    | Makes data available to children       |
| `useContext(Context)` | Lets child components access the value |



## ⚙️ When to Use Context

✅ Use Context when:

* You need to share global data (theme, language, auth status, user profile, etc.)
* You want to avoid prop drilling

🚫 Don’t use Context for:

* High-frequency updates (e.g., mouse movements, form inputs). It causes re-renders.
* Large-scale state management. Use Redux or Zustand if logic is complex.


## 🧪 Sample Use Case: Authentication

**Context API is great for storing current logged-in user:**

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
  <App />
</AuthContext.Provider>
```

Then anywhere in your app:

```jsx
const { user, logout } = useContext(AuthContext);
```

---

## 🆚 Context API vs Redux

| Feature     | Context API                  | Redux Toolkit                        |
| ----------- | ---------------------------- | ------------------------------------ |
| Scope       | Global (but app-specific)    | Global, app-wide, structured         |
| Setup       | Minimal                      | More setup                           |
| Use case    | Light state sharing          | Complex state logic, multiple slices |
| Performance | OK for low-frequency updates | Better control, optimized updates    |
| Middleware  | ❌ Not built-in               | ✅ Built-in (`redux-thunk`, etc.)     |

---

## ✅ Summary

* **Purpose**: Avoid prop drilling by sharing data globally across components.
* **When to use**: For app-wide data like theme, auth, language, etc.


### 🔧 Steps to Use:

1. **Create context**
   `const MyContext = createContext();`

2. **Create a provider**
   Wrap children with `<MyContext.Provider value={{...}}>`

3. **Wrap your app**
   `<MyProvider><App /></MyProvider>`

4. **Consume the context**
   Use `useContext(MyContext)` in any child component.


✅ **Result**: You can now read and update shared state **anywhere** in your component tree — cleanly and efficiently.


| Feature        | Description                                            |
| -------------- | ------------------------------------------------------ |
| **What is it** | A way to share values between components without props |
| **Why use it** | Avoids prop drilling, keeps code clean                 |
| **How to use** | `createContext`, `Provider`, `useContext`              |
| **Good for**   | Theme toggling, Auth, Language, Global settings        |
| **Avoid for**  | Fast-changing data or deeply structured logic          |

---

## 📝 Resources

* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [React Context API](https://react.dev/reference/react/createContext)
* [React Hooks](https://react.dev/reference/react/useContext)
* [YouTube](https://youtu.be/oANamKAxvmw?si=Jw-9QSz1-18wwnd6)