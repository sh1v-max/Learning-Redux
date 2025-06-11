// 1. Import createStore (Note: configureStore from Redux Toolkit is recommended for new projects)
import { createStore } from 'redux';

// 2. Define Initial State
// This is the starting point for your application's data.
const initialState = {
  post: 0,
  user: {
    name: 'Anurag Singh',
    age: 26,
  },
  status: 'idle', // Example for a simple status
};

// 3. Define Action Types
// Use constants to avoid typos and make your actions clear.
const INCREMENT = 'post/increment';
const DECREMENT = 'post/decrement';
const INCREASE_BY = 'post/increaseBy';
const DECREASE_BY = 'post/decreaseBy';
const SET_STATUS = 'app/setStatus';

// 4. Define the Reducer Function
// This pure function determines how the state changes in response to actions.
// It *must* return a new state object, never mutate the original.
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      // Actions can carry data in a `payload` property.
      return { ...state, post: state.post + action.payload };
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    default:
      // If the action type isn't recognized, return the current state unchanged.
      return state;
  }
}

// 5. Create the Redux Store
// The store holds your application's entire state tree and provides methods
// to interact with it (getState, dispatch, subscribe).
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())

// --- Interactions with the Store ---

// 6. Subscribe to State Changes (e.g., to update UI)
// This function runs every time an action is dispatched and the state is updated.
store.subscribe(() => {
  const currentState = store.getState();
  console.log('--- State Updated ---');
  console.log('Current Post Count:', currentState.post);
  console.log('Current App Status:', currentState.status);
  console.log('Full State:', currentState);
  console.log('---------------------');

  // In a real application, you'd update your UI elements here.
  // For this example, we're just logging to the console.
  const postCountElement = document.querySelector('.post-count');
  if (postCountElement) {
    postCountElement.textContent = currentState.post;
  }
});

// 7. Dispatch Actions to Change State
// This is the ONLY way to change the state in the Redux store.
console.log('Initial State:', store.getState());

store.dispatch({ type: INCREMENT }); // post: 1
store.dispatch({ type: INCREMENT }); // post: 2
store.dispatch({ type: DECREMENT }); // post: 1
store.dispatch({ type: INCREASE_BY, payload: 10 }); // post: 11
store.dispatch({ type: DECREASE_BY, payload: 3 }); // post: 8
store.dispatch({ type: SET_STATUS, payload: 'loading' }); // status: 'loading'
store.dispatch({ type: INCREMENT }); // post: 9 (demonstrating other parts of state are untouched)
store.dispatch({ type: SET_STATUS, payload: 'ready' }); // status: 'ready'


// You can also get the current state directly at any time:
console.log('Final State after all dispatches:', store.getState());
