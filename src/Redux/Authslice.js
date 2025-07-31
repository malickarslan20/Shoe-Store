import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
}

export const userslice= createSlice({
    name: "user",
    initialState,
    reducers: {
        setuser: (state,action)=>{
            state.user=action.payload;
        },
        clearuser:(state)=>{
            state.user=null;
        }
    }

})
export const {setuser,clearuser}=userslice.actions;
export default userslice.reducer;