import { configureStore, type AnyAction } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootReducers from './reducer';
import rootEpics from './epics';
import type { RootState } from './types';

// Import rootEpic từ nơi bạn khai báo các epics

const epicMiddleware = createEpicMiddleware<AnyAction,AnyAction,RootState>();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpics);

// Export các type hỗ trợ cho hooks
export type AppDispatch = typeof store.dispatch;