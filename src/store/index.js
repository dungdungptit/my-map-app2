import { configureStore } from '@reduxjs/toolkit'
import vehiclesReducer from './reducers/vehicleSlice'
import binsReducer from './reducers/binSlice'
import driversReducer from './reducers/driverSlice'
import authReducer from './reducers/authSlice'

const store = configureStore({
    reducer: {
        vehiclesReducer,
        binsReducer,
        driversReducer,
        authReducer,
    }
})

export default store