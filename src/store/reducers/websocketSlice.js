import { createSlice } from '@reduxjs/toolkit';

const base_url = 'ws://192.168.1.5:3001?id=admin_0'

const ws = new WebSocket(base_url);

const websocketSlice = createSlice({
    name: 'websocket',
    initialState: {
        ws: ws,
        isConnect: false,
        message: null,
    },
    reducers: {
        // connect
        connect: (state, action) => {
            state.ws = new WebSocket(base_url);
            state.isConnect = true;
        }
    },
    extraReducers: {
        // disconnect
        disconnect: (state, action) => {
            state.ws.close();
            state.isConnect = false;
        }
    }
});

const websocketReducer = websocketSlice.reducer;

export const websocketSelector = state => state.websocket;

export const { connect, disconnect } = websocketSlice.actions;

export default websocketReducer;