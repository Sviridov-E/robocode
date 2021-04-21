import { configureStore } from "@reduxjs/toolkit";
import savedCodesSlice from "./slices/savedCodesSlice";

const store = configureStore({
  reducer: {
    savedCodes: savedCodesSlice,
    /*         options: optionsReducer,
        userInfo: userInfoReducer */
  },
});

export default store;
