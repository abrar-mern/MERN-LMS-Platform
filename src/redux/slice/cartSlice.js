import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    // Add to cart add toast notification
    addToCart: (state, action) => {
      const course = action.payload;
      state.cart.push(course);
      state.totalItems += 1;
      state.total += course?.price || 0;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));
    },

    // Remove from cart with toast notification

    removeCart: (state, action) => {
      const courseId = action.payload;
      const courseIndex = state.cart.findIndex(
        (course) => course._id === courseId
      );
      if (courseIndex !== -1) {
        const course = state.cart[courseIndex];
        state.cart.splice(courseIndex, 1);
        state.totalItems = Math.max(0, state.totalItems - 1);
        state.total = Math.max(0, state.total - (course?.price || 0));
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));
    },

    // Reset Cart with toast notification
    resetCart: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { setTotalItems, addToCart, removeCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
