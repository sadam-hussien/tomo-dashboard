import { createSlice } from "@reduxjs/toolkit";
import { saveWebsoketToken, removeWebsoketToken } from "helpers";

const auth = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    saveUserData: (state, { payload }) => {
      saveWebsoketToken(payload.token);
      state.user = payload;
    },
    removeUserData: (state) => {
      removeWebsoketToken();
      state.user = null;
    },
  },
});

export default auth.reducer;

export const { saveUserData, removeUserData } = auth.actions;
