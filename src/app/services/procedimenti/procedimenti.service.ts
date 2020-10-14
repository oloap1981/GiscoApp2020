import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';

@Injectable()
export class ProcedimentiService {

    procedimentiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getListaProcedimentiAll(serverUrl: string, token: string): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + '0' // from
            + GlobalVariable.URL_SEPARATOR + '0' // to
            + GlobalVariable.URL_SEPARATOR + 'A' // tipologia
            + GlobalVariable.URL_SEPARATOR + 'A' // sito
            + GlobalVariable.URL_SEPARATOR + 'A', token); // titolo
    }

    public getListaProcedimenti(
        serverUrl: string,
        token: string,
        tipologia_key: any,
        sito: string,
        titolo: string,
        from: number,
        to: number): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from // from
            + GlobalVariable.URL_SEPARATOR + to // to
            + GlobalVariable.URL_SEPARATOR + tipologia_key // tipologia
            + GlobalVariable.URL_SEPARATOR + sito // sito
            + GlobalVariable.URL_SEPARATOR + titolo, token); // campo libero
    }

    public getProcedimento(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }


    public getListaTipologieProcedimento(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PROCEDIMENTI_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);
    }

}
