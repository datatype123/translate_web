import { from, switchMap, map, tap } from "rxjs";
import { getSystemConfig } from "./config.middleware";
import HttpClient from "./HttpClient";
import type { RequestOptions } from "./types";
import type { TranslateRequest,TranslateResponse,SpeechRequest } from "./types.d";
import {playBase64Audio} from '../utils/audio';
interface SpeechResponse {
  audio_data: string;                 
  audio_format: string;               
  billable_characters_count: number;  
  speech_marks: {
    chunks: Array<{
      end: number;        
      end_time: number;   
      start: number;      
      start_time: number; 
      type: string;       
      value: string;      
    }>;
  };
}


class TranslateController {
  public Post = {
    translate: (payload: TranslateRequest, options?: RequestOptions) => {
      return from(getSystemConfig()).pipe(
        switchMap((config:any) =>
          HttpClient.post(config.api.translate, payload, {
            headers: { "Content-Type": "application/json" },
            ...options,
          }).pipe(map((response: TranslateResponse) => response))
        )
      );
    },
    speech: (payload: SpeechRequest, options?: RequestOptions) => {
      return from(getSystemConfig()).pipe(
        switchMap((config: any) =>
          HttpClient.post(config.api.speech, payload, {
            headers: { "Content-Type": "application/json","Authorization": `Bearer ${config.api.apiKey}` },
            ...options,
          }).pipe(
            tap((response:SpeechResponse) => {
              playBase64Audio(response.audio_data);
              console.log("Raw audio data received:", response.audio_data);
            }
          )
        ))
      );
    },
    // detect:(payload:)
  };
}

export const translateService = new TranslateController();
