import { configureStore } from '@reduxjs/toolkit'
import vehiclesReducer from './reducers/vehicleSlice'
import binsReducer from './reducers/binSlice'

const store = configureStore({
    reducer: {
        vehiclesReducer,
        binsReducer
    }
})

export default store