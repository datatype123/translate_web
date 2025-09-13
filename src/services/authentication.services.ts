import HttpClient from "./HttpClient";
import type { RequestOptions } from "./types";
import { getSystemConfig } from "./config.middleware";
import type {LoginRequest} from './types.d';
import { map } from "rxjs";

class AuthenticationController{


  public Post = {
    login: (payload: LoginRequest, options?: RequestOptions) => {
      const authenUrl =  getSystemConfig();
      console.log('authenUrl',authenUrl.api.login);
      return HttpClient.post(`${authenUrl.api.login}`, payload, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      }).pipe(map(res => res as any));
    }

  }
}

export const authenticationService = new AuthenticationController();