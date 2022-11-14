import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
// axios.defaults.baseURL = 'http://192.168.1.7:3000/api/v1';
axios.defaults.baseURL = 'http://10.20.75.227:3000/api/v1';

// reducer thunk
export const getVehiclesDataAsync = createAsyncThunk("cars/getAllVehicles", async () => {
    const response = await axios.get("/vehicles");
    return response.data; 
})

const vehicleSlice = createSlice({ // createReducer + createActions
    name: 'vehicles',
    initialState: {
        allVehicles: [],
    },
    reducers: {
        // addTodo: (state, action) => {
        //     state.allTodos.push(action.payload)
        // },
    },
    extraReducers: {
        // get all todos
        [getVehiclesDataAsync.pending] : (state, action) => { // pending
            console.log("pending")
        },
        [getVehiclesDataAsync.fulfilled] : (state, action) => { // fulfilled = success
            console.log("success")
            state.allVehicles = action.payload
        },
        [getVehiclesDataAsync.rejected] : (state, action) => { // rejected = error
            console.log("error")
        }
    }
})

const vehiclesReducer = vehicleSlice.reducer;

export const vehiclesSelector = state => state.vehiclesReducer.allVehicles.vehicles;

export default vehiclesReducer