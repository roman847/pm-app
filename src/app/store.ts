import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from 'features/app/appSlice';
import counterReducer from 'features/counter/counterSlice';
import columnsReducer from 'features/columns/columnsSlice';
import modalDescriptionTaskReducer from 'features/modalDescriptionTask/modalSlice';
import boardsReducer from 'features/boards/boardsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    modalDescriptionTask: modalDescriptionTaskReducer,
    columns: columnsReducer,
    boards: boardsReducer,
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
