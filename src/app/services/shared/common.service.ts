import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { GlobalVariable } from '../../global';
import { StoreService } from '../store/store.service';

@Injectable()
export class CommonService {


    constructor(private httpService: HttpService,
                public storeService: StoreService) {
    }

    public getNotifiche(token: string, serverUrl: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_NOTIFICHE
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token); // protocollo
    }

    public getPrescrizioniChartData(token: string, serverUrl: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_PRESCRIZIONI_CHARTDATA
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token); // protocollo
    }

    public getAttivitaChartData(token: string, serverUrl: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.COMMON_GET_ATTIVITA_CHARTDATA
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token); // protocollo
    }
}
