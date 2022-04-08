import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fornecedorReducer from '../features/fornecedor/fornecedorSlice'
import produtoSlice from '../features/produtos/produtoSlice';
import stockOutSlice from '../features/stockOut/stockOut';

export const store = configureStore({
  reducer: {
    fornecedor: fornecedorReducer,
    produto: produtoSlice,
    stockOut: stockOutSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
