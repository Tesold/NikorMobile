import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLOG_IN: false
  },
  reducers: {
    LOG_IN:(state)=>{state.isLOG_IN=true},
    LOG_OUT:(state)=>{state.isLOG_IN=false}
    },
  });

export const { LOG_IN, LOG_OUT } = loginSlice.actions;
export default loginSlice.reducer;

