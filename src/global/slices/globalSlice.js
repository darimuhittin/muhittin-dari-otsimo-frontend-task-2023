import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isMobileMenuOpen: false
  },
  reducers: {
    OPEN_MOBILE_MENU: (state) => ({
      ...state,
      isMobileMenuOpen: true
    }),
    CLOSE_MOBILE_MENU: (state) => ({
      ...state,
      isMobileMenuOpen: false
    }),
    TOGGLE_MOBILE_MENU: (state) => ({
      ...state,
      isMobileMenuOpen: !state.isMobileMenuOpen
    })
  }
})

// Action creators are generated for each case reducer function
export const {
  // MOBILE MENU
  OPEN_MOBILE_MENU,
  CLOSE_MOBILE_MENU,
  TOGGLE_MOBILE_MENU
} = globalSlice.actions

export default globalSlice.reducer
