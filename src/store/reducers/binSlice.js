import React from 'react'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.1.7:3000/api/v1';
axios.defaults.baseURL = 'http://10.20.75.227:3000/api/v1';

export const getBinsDataAsync = createAsyncThunk('bins/getAllBins', async () => {
    const response = await axios.get('/bins')
    return response.data
})

const binSlice = createSlice({
    name: 'bins',
    initialState: {
        allBins: [],
    },
    reducers: {},
    extraReducers: {
        [getBinsDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [getBinsDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allBins = action.payload
        },
        [getBinsDataAsync.rejected]: (state, action) => {
            console.log('error')
        }
    }
})

const binsReducer = binSlice.reducer

export const binsSelector = state => state.binsReducer.allBins.bins

export default binsReducer