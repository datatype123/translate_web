import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {LoginRequest} from '../../services/types.d';
import type { RootEpic } from '../types';
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { concat, of } from "rxjs";
import { authenticationService } from '../../services/authentication.services';

interface UserState {
  id: string | null;
  name: string;
  email: string;
  token: string | null;
  isPremium: boolean;
  password:string;
  error:string;
  preferredLanguages: string[];
  translationHistory: Array<{
    id: string;
    source: string;
    target: string;
    from: string;
    to: string;
    date: string;
  }>;
  favorites: Array<{
    id: string;
    source: string;
    target: string;
    from: string;
    to: string;
  }>;
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  token: null,
  isPremium: false,
  preferredLanguages: [],
  translationHistory: [],
  favorites: [],
  password:'',
  error:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
    login(state, action: PayloadAction<LoginRequest>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addHistory(state, action: PayloadAction<UserState['translationHistory'][0]>) {
      state.translationHistory.unshift(action.payload);
    },
    addFavorite(state, action: PayloadAction<UserState['favorites'][0]>) {
      state.favorites.unshift(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    setPremium(state, action: PayloadAction<boolean>) {
      state.isPremium = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setPreferredLanguages(state, action: PayloadAction<string[]>) {
      state.preferredLanguages = action.payload;
    }
  }
});

export const loginUser$: RootEpic = (action$) =>
  action$.pipe(
    filter(userActions.login.match),
    switchMap((action) =>
      authenticationService.Post.login(action.payload).pipe(
        map((res:any) => {
          const results = res.results;
          return userActions.setUser({
            id: results.id,
            name: results.name,
            email: results.email,
            token: results.token,
            isPremium: results.isPremium,
            preferredLanguages: results.preferredLanguages,
          });
        }),
        catchError((err) => {
          console.log(err.message || "Error loading folders");
          return of(userActions.loginFailure(err.message || "Error loading folders"));
        })
      )
    )
  );



export const userEpics = [loginUser$];
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;