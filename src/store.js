import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen : false,
};

// state 느낌
let showModal = createSlice({
    // state 이름
    name : 'showSearchModal',
    // value
    initialState,

    reducers : {
        changeState : (state) => {
            state.isOpen = !state.isOpen;
        },
    }
})

export const { changeState } = showModal.actions;

export default configureStore({
  reducer: { 
    // 등록
    showModal : showModal.reducer
  }
}) 