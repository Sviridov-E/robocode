import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(window.localStorage.getItem("savedCodes")) || {};

export const savedCodesSlice = createSlice({
  name: "savedCodes",
  initialState,
  reducers: {
    saveCode(state, action) {
      state[action.payload.name] = action.payload.values;
    },
    removeCode(state, action) {
      delete state[action.payload.name];
    },
  },
});

export const saveCode = (payload) => (dispatch, getState) => {
  dispatch(savedCodesSlice.actions.saveCode(payload));
  window.localStorage.setItem(
    "savedCodes",
    JSON.stringify(getState().savedCodes)
  );
};

export const removeCode = (payload) => (dispatch, getState) => {
  dispatch(savedCodesSlice.actions.removeCode(payload));
  window.localStorage.setItem(
    "savedCodes",
    JSON.stringify(getState().savedCodes)
  );
};

export const selectSavedCodes = (state) => state.savedCodes;
export const selectCodesLength = (state) =>
  Object.keys(state.savedCodes).length;

export default savedCodesSlice.reducer;
