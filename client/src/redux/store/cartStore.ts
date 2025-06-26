import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';

export const cartStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;
