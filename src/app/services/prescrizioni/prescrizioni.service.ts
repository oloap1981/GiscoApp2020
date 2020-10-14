import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';

@Injectable()
export class PrescrizioniService {


    constructor(private httpService: HttpService) {
    }

    public getPrescrizione(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.PRESCRIZIONE_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }
}
