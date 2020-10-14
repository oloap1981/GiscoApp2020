import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Login } from '../../models/login/login.namespace';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfiloService {

    sitiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getProfilo(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_GET_SCHEDA_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }

    public changePassword(serverUrl: string, token, oldPsw: string, newPsw: string, rep: string): Observable<Http.HttpResponse> {
        const body = {
            dipendenti_key: token.token_dipendente_key,
            password: oldPsw,
            password_new: newPsw,
            password_rep: rep,
            token: token.token_value
        };
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_CHANGE_PSW_KEYWORD, body);
    }

    public changeAvatar(serverUrl: string, imm, token: Login.ws_Token): Observable<Http.HttpResponse> {
        const body = {
            token,
            dipendenti_key: token.token_dipendente_key,
            immagine: imm
        };
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROFILO_CHANGE_AVATAR_KEYWORD, body);
    }
}
