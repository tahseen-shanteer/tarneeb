import { configureStore } from "@reduxjs/toolkit"
import lobbyReducer from '../state/slices/lobbySlice'

// central storage for global use

export const store = configureStore({
    reducer: {
        lobby: lobbyReducer,
    }
});