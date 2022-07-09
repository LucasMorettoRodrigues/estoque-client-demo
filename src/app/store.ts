import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fornecedorReducer from '../features/fornecedor/fornecedorSlice'
import produtoReducer from '../features/produtos/produtoSlice';
import authenticationReducer from '../features/authentication/authentication'
import notificationReducer from '../features/notification/notificationSlice';
import historicSlice from '../features/historic/historicSlice';

export const store = configureStore({
  reducer: {
    fornecedor: fornecedorReducer,
    produto: produtoReducer,
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
