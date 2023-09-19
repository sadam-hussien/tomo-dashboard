import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global_reducer",
  initialState: {
    modal: {
      isShow: false,
      data: null,
    },
    selectedRows: [],
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
    addSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
});

export default globalReducer.reducer;

export const { closeModal, openModal, addSelectedRows } = globalReducer.actions;
