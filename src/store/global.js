import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global_reducer",
  initialState: {
    modal: {
      isShow: false,
      data: null,
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.modal.isShow = true;
      state.modal.data = action.payload;
    },
    closeModal: (state) => {
      state.modal.isShow = false;
      state.modal.data = null;
    },
  },
});

export default globalReducer.reducer;

export const { closeModal, openModal } = globalReducer.actions;
