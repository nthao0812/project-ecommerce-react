import { createSlice } from "@reduxjs/toolkit";

const chatSlide = createSlice({
  name: "chat",
  initialState: {
    content: ["💘ENTER SOMETHING 💘"],
    isDisplay: false,
  },
  reducers: {
    toggle(state) {
      state.isDisplay = !state.isDisplay;
    },
    hide(state) {
      state.isDisplay = false;
    },
    sendMessage(state, action) {
      state.content.push(action.payload);
    },
  },
});
export const ChatActions = chatSlide.actions;
export default chatSlide.reducer;
