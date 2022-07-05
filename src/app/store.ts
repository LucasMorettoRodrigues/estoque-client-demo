import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fornecedorReducer from '../features/fornecedor/fornecedorSlice'
import produtoReducer from '../features/produtos/produtoSlice';
import stockInReducer from '../features/stockIn/stockIn';
import stockOutReducer from '../features/stockOut/stockOut';
import adjustStockReducer from '../features/adjustStock/adjustStock'
import authenticationReducer from '../features/authentication/authentication'
import notificationReducer from '../features/notification/notificationSlice';
import historicSlice from '../features/historic/historicSlice';

export const store = configureStore({
  reducer: {
    fornecedor: fornecedorReducer,
    produto: produtoReducer,
    stockOut: stockOutReducer,
    stockIn: stockInReducer,
    adjustStock: adjustStockReducer,
    authentication: authenticationReducer,
    notification: notificationReducer,
    historic: historicSlice
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
