import { createSlice } from "@reduxjs/toolkit";
const loginSlide = createSlice({
  name: "login",
  initialState: {
    userName: "",
    isLogin: false,
  },
  reducers: {
    onLogin(state, action) {
      state.userName = action.payload;
      state.isLogin = true;
    },
    onLogout(state) {
      state.userName = "";
      state.isLogin = false;
    },
  },
});
export const loginActions = loginSlide.actions;
export default loginSlide.reducer;
