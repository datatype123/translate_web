import type{ RootState } from '../types.d';

export const selectUser = (state: RootState) => state.user;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectIsPremium = (state: RootState) => state.user.isPremium;
export const selectPreferredLanguages = (state: RootState) => state.user.preferredLanguages;