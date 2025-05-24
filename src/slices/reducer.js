import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

// reducer files
import layoutReducer from './layout/reducer'

const rootReducer = combineReducers({
  Layout: layoutReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer,
  })

const store = makeStore()

export default store
