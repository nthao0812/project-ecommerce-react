import { createSlice } from "@reduxjs/toolkit";
const cartSlide = createSlice({
  name: "cart",
  initialState: {
    owner: "",
    items: [],
  },
  reducers: {
    setOwner(state, action) {
      state.owner = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    reset(state) {
      state.owner = "";
      state.items = [];
    },
    addCart(state, action) {
      const actionID = action.payload.id;
      const quan = action.payload.quan;

      const exist = state.items.find((item) => item.id === actionID);

      if (!exist) {
        state.items.push({ id: actionID, quan: quan });
      } else {
        exist.quan += quan;
      }
    },
    updateCart(state, action) {
      const exist = state.items.find((item) => item.id === action.payload.id);
      exist.quan = action.payload.quan;
    },
    deleteCart(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
  },
});
export const cartActions = cartSlide.actions;
export default cartSlide.reducer;
