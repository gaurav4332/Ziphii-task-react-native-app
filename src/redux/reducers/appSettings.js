import { createSlice } from "@reduxjs/toolkit";

const appSettingSlice = createSlice({
  name: "appSetting",
  initialState: {
    selectedTheme: "dark",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
  },
});

export const {  changeTheme } = appSettingSlice.actions;

export default appSettingSlice.reducer;
