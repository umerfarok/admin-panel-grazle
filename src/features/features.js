import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNavigation: "",
  showSidebar: false,
  user: {},
  pageLoader: false,
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updatePageNavigation: (state, action) => {
      state.pageNavigation = action.payload;
    },
    updateSidebar: (state, action) => {
      state.showSidebar = action.payload
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updatePageLoader: (state, action) => {
      state.pageLoader = action.payload;
    },
  },
});

export const { updatePageNavigation, updateSidebar, updateUser, updatePageLoader } = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
