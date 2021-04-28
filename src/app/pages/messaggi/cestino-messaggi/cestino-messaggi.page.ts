import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Component, NgZone } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'cestino-messaggi',
  templateUrl: './cestino-messaggi.page.html',
  styleUrls: ['./cestino-messaggi.page.scss'],

})

export class CestinoMessaggiPage extends BaseComponent {

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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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

  async getMessaggi(infiniteScroll?) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getListaMessaggiCestino(this.storeService.getLocalServerUrl(), tokenValue, this.campoLibero,
        this.numMess, this.numMess + 19).subscribe(r => {
          console.log('getListaMessaggiCestino');
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
            console.log("getListaMessaggiCestino num ricevuti", r.l_lista_messaggi.length);
            console.log("getListaMessaggiCestino totali", this.listaMessaggi.length);
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

  public goToDetails(mess) {
    this.goToPageParams('details-messaggio',
    {
      queryParams: {
        mess: JSON.stringify(mess),
        messagioCestino: true
      }
    });
  }

  back() {
    this.navCtrl.pop();
  }

  async deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Eliminare definitivamente il messaggio?',
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
            this.delete(mess);
          }
        }
      ]
    });
    alert.present();
  }


  delete(mess) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      let busta = new Messaggio.BustaMessaggio();
      busta.messaggio = mess;
      busta.token = tokenValue;
      this.messaggiService.deleteMessage(this.storeService.getLocalServerUrl(), busta).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(busta);
          console.log(r);
          this.listaMessaggi.splice(this.listaMessaggi.indexOf(mess), 1);
          this.numMess = this.numMess - 1;
          this.presentAlert("", "messaggio eliminato");
        }
      },
        (error) => {
          console.log(error);
        })
    })
  }

  async ripristinaConfirm(mess: Messaggio.Messaggio) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Rirpistinare il messaggio?',
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
            this.ripristina(mess);
          }
        }
      ]
    });
    alert.present();
  }

  ripristina(mess) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.recDeleteMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log("Recuperato ", r);
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

  async presentAlert(title: string, mess: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    alert.present();
  }

  goToNuovoMessaggio() {
    this.goToPage('nuovo-messaggio');
  }

  goToUscitaMessaggi() {
    this.goToPage('uscita-messaggi');
  }

  goToImportantiMessaggi() {
    this.goToPage('importanti-messaggi');
  }

  goToIngressoMessaggi() {
    this.goToPage('elenco-messaggi');
  }
}

