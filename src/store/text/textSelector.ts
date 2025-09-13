import type { RootState } from '../types.d';

export const selectTextState = (state: RootState) => state.text;
export const selectSourceText = (state: RootState) => state.text.sourceText;
export const selectTranslatedText = (state: RootState) => state.text.translatedText;
export const selectIsTranslating = (state: RootState) => state.text.isTranslating;
export const selectTextError = (state: RootState) => state.text.error;
export const selectOriginLanguage = (state: RootState) => state.text.originLanguage;
export const selectTargetLanguage = (state: RootState) => state.text.targetLanguage;
export const selectVoiceId = (state: RootState) => state.text.voice_id;