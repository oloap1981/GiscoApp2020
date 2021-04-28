import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';

import { GeolocatedService } from '../shared/geolocated.service';
import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';

@Injectable()
export class SitiService {

    sitiService: string[];
    private currentLat: string;
    private currentLon: string;

    constructor(private httpService: HttpService,
                private geolocated: GeolocatedService) {
        this.currentLat = '0';
        this.currentLon = '0';

        this.geolocated.getCurrentPos().then((pos: Geoposition) => {
            this.currentLat = (pos.coords.latitude + '').replace('.', ',');
            this.currentLon = (pos.coords.longitude + '').replace('.', ',');
        }, (err: PositionError) => {
            // vallutare la gestione dell'errore se non si recuperano le coordinate
            console.log('error : ' + err.message);

        });
    }

    public getListaSitiAll(serverUrl: string, token: string): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + '0' // from
            + GlobalVariable.URL_SEPARATOR + '0' // to
            + GlobalVariable.URL_SEPARATOR + 'A' // tipologia
            + GlobalVariable.URL_SEPARATOR + 'A' // provincia
            + GlobalVariable.URL_SEPARATOR + 'A'
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token); // testo libero
    }

    public getListaSiti(
        serverUrl: string, token: string, tipologia_key: any, provincia_cod: string, campoLibero:string, from:any, to:any): Observable<Http.HttpResponse> {

        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + tipologia_key
            + GlobalVariable.URL_SEPARATOR + provincia_cod
            + GlobalVariable.URL_SEPARATOR + campoLibero
            + GlobalVariable.URL_SEPARATOR + this.currentLat
            + GlobalVariable.URL_SEPARATOR + this.currentLon
            , token); // campo libero
    }

    public getSito(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token); // id sito esempio: key=120 ha tutti i dati che devono essere visualizzati
    }

    public getListaProvinceSito(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.GET_PROVINCE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + '46' // tipoddl
            + GlobalVariable.URL_SEPARATOR + 'N' // filtro
            + GlobalVariable.URL_SEPARATOR + 'N' // ordina
            + GlobalVariable.URL_SEPARATOR + 'N' // componi
            + GlobalVariable.URL_SEPARATOR + 'N' // primovuoto
            + GlobalVariable.URL_SEPARATOR + 'Tutti', token); // primotutti
    }

    public getListaTipologieSito(serverUrl: string, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.SITI_GET_TIPOLOGIE_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER, token);
    }

}
