let state = {
  count: 0
}

let prevState = state

function increment(){
  // we are mutating the state
  // state.count = state.count + 1
  // using this will update prevState too

  // not mutating state
  state = {count: state.count + 1}
}

increment()
console.log(state)
increment()
console.log(state)
increment()
console.log(state)
increment()
console.log(state)