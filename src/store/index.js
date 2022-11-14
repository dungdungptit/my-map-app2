import { configureStore } from '@reduxjs/toolkit'
import vehiclesReducer from './reducers/vehicleSlice'
import binsReducer from './reducers/binSlice'
import driversReducer from './reducers/driverSlice'

const store = configureStore({
    reducer: {
        vehiclesReducer,
        binsReducer,
        driversReducer,
    }
})

export default store