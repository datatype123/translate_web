import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { concat, from, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { translateService } from '../../services/translate.services';
import type { SpeechRequest, TranslateRequest } from '../../services/types';
import type { RootEpic } from '../types';

interface TextState {
  originLanguage: string;
  sourceText: string;
  targetLanguage: string;
  translatedText: string;
  isTranslating: boolean;
  isSpeeching: {
      origin: boolean;
      translated: boolean;
      [key: string]: boolean; // mở rộng thêm type khác
    };
  error: string | null;
  voice_id: string;
}




const initialState: TextState = {
  originLanguage: '',
  sourceText: '',
  targetLanguage: 'en',
  translatedText: '',
  isTranslating: false,
  isSpeeching: {
    origin: false,
    translated: false
  },
  error: null,
  voice_id: ''  
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setSourceText(state, action: PayloadAction<string>) {
      state.sourceText = action.payload;
    },
    setTranslatedText(state, action: PayloadAction<string>) {
      state.translatedText = action.payload;
    },
    setIsTranslating(state, action: PayloadAction<boolean>) {
      state.isTranslating = action.payload;
    },
    setIsSpeeching(
      state,
      action: PayloadAction<{ type: string; value: boolean }>
    ) {
      state.isSpeeching[action.payload.type] = action.payload.value;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    speechText(state, action: PayloadAction<SpeechRequest>) {
      // state.isTranslating = true;
    },
    translateText(state, action: PayloadAction<TranslateRequest>) {
      // state.isTranslating = true;
      state.originLanguage = action.payload.origin;
      state.sourceText = action.payload.input;
      state.targetLanguage = action.payload.target;
    },
    resetText(state) {
      state.sourceText = '';
      state.translatedText = '';
      state.isTranslating = false;
      state.error = null;
    },
  },
});


export const translateText$: RootEpic = (action$) =>
  action$.pipe(
    filter(textActions.translateText.match),
    switchMap((action) =>
      concat(
        of(textActions.setIsTranslating(true)),
        from(translateService.Post.translate(action.payload)).pipe(
          map((res: any) => textActions.setTranslatedText(res?.lang?.translatedText ?? "")),
          catchError((err) =>
            of(textActions.setError(err.message || "Translation failed"))
          ),
          map((action) => [action, textActions.setIsTranslating(false)]),
          switchMap(actions => actions)
        )
      )
    )
  );

export const speechText$: RootEpic = (action$) =>
  action$.pipe(
    filter(textActions.speechText.match),
    switchMap((action) =>
      concat(
        of(textActions.setIsSpeeching({ type: action.payload.type, value: true })),
        from(translateService.Post.speech(action.payload)).pipe(
          map(() => textActions.setIsSpeeching({ type: action.payload.type, value: false })),
          catchError((err) =>
            of(textActions.setError(err.message || "Speech synthesis failed"))
          )
        )
      )
    )
  );


export const textEpics = [translateText$, speechText$];
export const textActions = textSlice.actions;
export const textReducer = textSlice.reducer;