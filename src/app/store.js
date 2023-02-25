import { configureStore } from '@reduxjs/toolkit'
import globalReducer from 'global/slices/globalSlice'
export default configureStore({
  reducer: {
    global: globalReducer
  }
})
