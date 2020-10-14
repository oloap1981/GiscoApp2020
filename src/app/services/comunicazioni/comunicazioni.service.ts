import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';

@Injectable()
export class ComunicazioniService {

    constructor(private httpService: HttpService) {
    }

    public getListaComunicazioni(
        serverUrl: string,
        token: string,
        sito_key: number,
        procedimento_key: number): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL
            + GlobalVariable.COMUNICAZIONI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + sito_key
            + GlobalVariable.URL_SEPARATOR + procedimento_key, token); // libero
    }

    public getComunicazione(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.COMUNICAZIONI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }


}
