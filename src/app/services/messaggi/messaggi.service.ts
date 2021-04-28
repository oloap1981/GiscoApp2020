import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../../global';

import { Http } from '../../models/shared/http.namespace';
import { Messaggio } from '../../models/messaggio/messaggio.namespace';

@Injectable()
export class MessaggiService {

    messaggiService: string[];

    constructor(private httpService: HttpService) {
    }

    public getMessaggio(serverUrl: string, key: number, token: string): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key, token);
    }
    /*I = Ricevuto
    O = Inviato
    D = Cestinato
    P = Preferito
     */
    public getListaMessaggiRicevuti(serverUrl: string, token: string, filter: string, from: any, to: any): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from // from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + 'I'
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }

    public getListaMessaggiCestino(serverUrl: string, token: string, filter: string, from: any, to: any): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from // from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + 'D'
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }

    public getListaMessaggiUscita(serverUrl: string, token: string, filter: string, from: any, to: any): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from // from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + 'O'
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }
    public getListaMessaggiImportanti(serverUrl: string, token: string, filter: string, from: any, to: any): Observable<Http.HttpResponse> {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + from // from
            + GlobalVariable.URL_SEPARATOR + to
            + GlobalVariable.URL_SEPARATOR + 'P'
            + GlobalVariable.URL_SEPARATOR + filter, token);
    }


    public getDipendentiAttivi(serverUrl: string, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_ELENCO_DIPENDENTI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + 'S', token);
    }

    public getDipendentiAttiviSito(serverUrl: string, sito_cod: string, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_GET_COMBO_DIPENDENTI_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + sito_cod, token);
    }

    /*  public GetContactDetails(key : number){

          return new Promise((resolve, reject) => {
              this.store.getUserDataPromise().then(
                  (token :Login.Token)=>{
                      if (key == -1) key = token.token_dipendente_key ;
                      let url = 'http://allinappws.mesys.it/services/get_scheda_dipendente/'+ token.token_value+'/'+ key;
                      console.log(url);
                      let s = this.http.get<Contact.ContactDataFull>(url).subscribe(
                          (r : Contact.ContactDataFull)=>{
                              if (r.ErrorMessage.msg_code==0){
                                  resolve(r.dipendente);
                              }else{
                                  reject(r.ErrorMessage);
                              }

                              s.unsubscribe();
                          }
                      )
                  }
              )

          });
      }*/
    /*  Mette o toglie dai preferito
  Con stato:
  N=toglie
  S=mette*/
    public setStarMessage(serverUrl: string, key: number, stato: string, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SET_STAR_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key
            + GlobalVariable.URL_SEPARATOR + stato, token);
    }

    public setDeleteMessage(serverUrl: string, key: number, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SET_DELETED_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key
            + GlobalVariable.URL_SEPARATOR, token);
    }

    public recDeleteMessage(serverUrl: string, key: number, token: string) {
        return this.httpService.get(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_REC_DELETED_KEYWORD
            + GlobalVariable.URL_SEPARATOR + GlobalVariable.URL_TOKEN_PLACEHOLDER
            + GlobalVariable.URL_SEPARATOR + key
            + GlobalVariable.URL_SEPARATOR, token);
    }

    public deleteMessage(serverUrl: string, mess) {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_DELET_KEYWORD
            + GlobalVariable.URL_SEPARATOR, mess);
    }

    public sendMessage(serverUrl: string, mess: Messaggio.BustaMessaggio): Observable<Http.HttpResponse> {
        return this.httpService.post(serverUrl + GlobalVariable.BASE_API_URL + GlobalVariable.MESSAGGI_SALVA_KEYWORD, mess);
    }

}
