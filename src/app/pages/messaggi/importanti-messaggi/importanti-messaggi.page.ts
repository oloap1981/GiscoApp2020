import { NavController, AlertController, LoadingController} from '@ionic/angular';

import { Component, NgZone, OnInit } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { UscitaMessaggiPage } from '../uscita-messaggi/uscita-messaggi.page';



@Component({
  selector: 'importanti-messaggi',
  templateUrl: './importanti-messaggi.page.html',
  styleUrls: ['./importanti-messaggi.page.scss'],

})

export class ImportantiMessaggiPage extends BaseComponent {

  public listaMessaggi: Array<Messaggio.Messaggio>;
  public listaAllMessaggi: Array<Messaggio.Messaggio>;
  color: string;
  icon: string;
  public campoLibero: string;
  public numMess = 1;
  public numMessRicevuti: number;

  constructor(public navCtrl: NavController,
    private storeService: StoreService,
    private messaggiService: MessaggiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.listaMessaggi = new Array<Messaggio.Messaggio>();
    this.campoLibero = "A";
    this.numMessRicevuti = 1;

  }

  ionViewDidEnter() {
    this.getMessaggi();
  }

  back() {
    this.navCtrl.pop();
  }

  async getMessaggi(infiniteScroll?) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getListaMessaggiImportanti(this.storeService.getLocalServerUrl(), tokenValue, this.campoLibero,
        this.numMess, this.numMess + 19).subscribe(r => {
          console.log('getListaMessaggiRicevuti');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numMessRicevuti = r.l_lista_messaggi.length;
            if (!infiniteScroll) {
              this.listaMessaggi.length = 0;
              this.listaMessaggi = r.l_lista_messaggi;
            } else {
              infiniteScroll.target.complete();
              this.listaMessaggi.push(...r.l_lista_messaggi);
            }
            console.log("getDocumenti num ricevuti", r.l_lista_messaggi.length);
            //   console.log("getDocumenti totali", this.listaMessaggi.length);
          }
          loading.dismiss();
        });
    });
  }

  public setMessaggiFiltro(event) {
    if (event != undefined) {
      this.campoLibero = event.value;
    }
    if (this.campoLibero === "") {
      this.campoLibero = "A";
    }
    this.numMess = 1;
    this.getMessaggi();
  }

  public loadMore(infiniteScroll) {
    this.numMess = this.numMess + 20;
    if (this.numMessRicevuti >= 20) {
      this.getMessaggi(infiniteScroll);
    } else {
      infiniteScroll.target.complete();
    }
  }

  setStar(mess: Messaggio.Messaggio) {

    var stato = ((mess.preferito === '' || mess.preferito === 'N') ? 'S' : 'N');
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setStarMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, stato, tokenValue).subscribe(r => {
        mess.preferito = stato;
        this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
        //this.getMessaggi();
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  setDelete(mess: Messaggio.Messaggio) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setDeleteMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log("Deleted ", r);
          /* this.numMess = 1;
           this.getMessaggi();*/
          this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
          this.numMess = this.numMess - 1;
        }
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  async deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'spostare questo messaggio nel cestino?',
      buttons: [
        {
          text: 'indietro',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'ok',
          handler: () => {
            this.setDelete(mess);
          }
        }
      ]
    });
    alert.present();
  }

  public goToDetails(mess) {
    this.goToPageParams('details-messaggio',
    {
      queryParams: {
        mess: JSON.stringify(mess),
        onlyNotImportant: false
      }
    });
    //this.navCtrl.push(DetailsMessaggioPage, { mess: mess, callback: this.eliminaMessCallbackFunction, onlyNotImportant: false });
  }

  goToNuovoMessaggio() {
    this.goToPage('nuovo-messaggio');
  }

  goToUscitaMessaggi() {
    this.goToPage('uscita-messaggi');
  }

  goToCestinoMessaggio() {
    this.goToPage('cestino-messaggi');
  }

  goToIngressoMessaggi() {
    this.goToPage('elenco-messaggi');
  }

}
