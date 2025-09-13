import { UnknownAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { AnyAction } from '@reduxjs/toolkit';

import rootReducers from './reducers';

export type RootState = ReturnType<typeof rootReducers>;
export type RootEpic = Epic<AnyAction, AnyAction, RootState>;   