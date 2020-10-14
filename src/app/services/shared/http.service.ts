import { Http } from './../../models/shared/http.namespace';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../models/login/login.namespace';

@Injectable()
export class HttpService {


    constructor(private http: HttpClient) { }

    // questa operazione serve per il login
    public getToken(url: string, loginRequest: Login.LoginRequest): Observable<Login.ws_Token> {
        console.log(url);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // return this.http.get<Login.ws_Token>(url + '/1', { headers: headers });
        return this.http.post<Login.ws_Token>(url, loginRequest, { headers });
    }

    // questa operazione va solo se si è loggati
    public get(url: string, tokenValue: string): Observable<Http.HttpResponse> {

        // vado a sostituire il placeholder con il token che ho in sesssione (se c'è) prima di fare qualsiasi chiamata get al server
        const completeUrl = url.replace('TOKEN', tokenValue);
        console.log('HttpService get ' + completeUrl);
        return this.http.get<Http.HttpResponse>(completeUrl);
    }

    public getLoader(url: string, tokenValue: string): Observable<Http.HttpResponse> {

        // vado a sostituire il placeholder con il token che ho in sesssione (se c'è) prima di fare qualsiasi chiamata get al server
        const completeUrl = url.replace('TOKEN', tokenValue);
        console.log('HttpService get ' + completeUrl);



        const headers = new HttpHeaders().set('Loading', '1');
        const params = new HttpParams().set('Loading', '1');

        return this.http.get<Http.HttpResponse>(completeUrl, {
            headers, params
        });
    }

    // questa operazione va solo se si è loggati
    public getNoToken(url: string): Observable<Http.HttpResponse> {
        return this.http.get<Http.HttpResponse>(url);
        // .timeoutWith(10000, Observable.throw(new Error('TIMEOUT')));
    }

    public post(url: string, body): Observable<Http.HttpResponse> {
        console.log('HttpService post ' + url);
        return this.http.post<Http.HttpResponse>(url, body);
    }

}
