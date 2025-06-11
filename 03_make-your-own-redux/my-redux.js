export function myCreateStore(reducer) {
  let state
  const listeners = []
  const store = {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
      listeners.forEach((listener) => {
        listener()
      })
    },
    subscribe(listener) {
    },
  }

  store.dispatch({ type: '@@INIT' })
  return store
}
