export function myCreateStore(reducer) {
  let state
  const listeners = []
  const store = {
    getState() {
    },
    dispatch(action) {
    },
    subscribe(listener) {
    },
  }

  store.dispatch({ type: '@@INIT' })
  return store
}
