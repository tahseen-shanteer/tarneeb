// file for lobby slice, slice is part of toolkit

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lobbyCode: null,
  playerName: null,
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setLobbyCode: (state, action) => {
      state.lobbyCode = action.payload;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
  },
});

export const { setLobbyCode, setPlayerName} = lobbySlice.actions;
export const selectApp = (state) => state.lobby;
export default lobbySlice.reducer;
