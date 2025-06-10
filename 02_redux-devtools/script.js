import { createStore } from 'redux'
const postCountElement = document.querySelector('.post-count')

const initialState = {
  post: 0,
  name: 'Anurag Singh',
  age: 26,
}

const INCREMENT = 'post/increment'
const DECREMENT = 'post/decrement'
const INCREASE_BY = 'post/increaseBy'
const DECREASE_BY = 'post/decreaseBy'

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 }
    case DECREMENT:
      return { ...state, post: state.post - 1 }
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload }
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload }
    default:
      return state
  }
}

