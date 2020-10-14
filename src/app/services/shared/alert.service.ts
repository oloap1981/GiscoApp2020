// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/timeoutWith';

// import { Login } from './../../models/login/login.namespace';
import { NavController, AlertController} from '@ionic/angular'; // Platform, MenuController, Nav,

import { Injectable, NgZone } from '@angular/core';
// import { GlobalVariable } from '../../global';
// import { HttpClient } from '@angular/common/http';

// port { ElencoMessaggiPage } from '../../pages/messaggi/elenco-messaggi/elenco-messaggi';

// import { BasePage } from '../../pages/common/base';
// import { ElencoAttivitaPage } from '../../pages/attivita/elenco-attivita/elenco-attivita';
// import { ElencoProcedimentiPage } from '../../pages/procedimenti/elenco-procedimenti/elenco-procedimenti';
import { StoreService } from '../store/store.service';

import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AlertService {

     constructor(
        public alertController: AlertController,
        public storeService: StoreService,
        public loginService: LoginService,
        public router: Router,
        public ngZone: NgZone){}

     public async presentAlert(message: string) {
        const alert = await this.alertController.create({
          header: 'Conferma',
          message,
          buttons: ['OK']
        });
        alert.present();
      }

      public async presentErrorAlert(message: string) {
        const alert = await this.alertController.create({
          header: 'Errore',
          message,
          buttons: ['CHIUDI']
        });
        alert.present();
      }

      public async presentAlertNewPage(nav: NavController, type: string, id: number) {
        let messaggio = '';
        switch (type){
          case 'messaggi':
              messaggio = 'Vai alla sezione Messaggi';
              break;
          case 'attivita':
              messaggio = 'Vai alla sezione Attività';
              break;
          case 'prescrizioni':
              messaggio = 'Vai alla sezione Prescrizioni';
              break;
          case 'commenti_at':
              messaggio = 'Vai alla sezione Attività';
              break;
          case 'commenti_os':
              messaggio = 'Vai alla sezione Osservazioni';
              break;
          default:
              messaggio = '';
        }
        const confirm = await this.alertController.create({
          header: 'Hai ricevuto una nuova notifica per la sezione. ' + messaggio,
          buttons: [
            {
              text: 'VAI',
              handler: () => {
                switch (type) {
                  case 'messaggi':
                    this.ngZone.run(() => this.router.navigate(['elenco-messaggi'])).then();
                    break;
                  case 'attivita':
                    this.ngZone.run(() => this.router.navigate(['elenco-attivita'])).then();
                    break;
                  case 'prescrizioni':
                    this.ngZone.run(() => this.router.navigate(['elenco-procedimenti'])).then();
                    break;
                  default:
                    this.ngZone.run(() => this.router.navigate(['elenco-messaggi'])).then();
                    break;
                }
              }
            }
          ]
        });
        confirm.present();
      }

      public async presentServerInputAlert(header: string) {
        const alert = await this.alertController.create({
          header,
          inputs: [
            {
              name: 'indirizzo',
              placeholder: 'http://servername'
            }
          ],
          buttons: [
            {
              text: 'Salva',
              handler: data => {
                const server = data.indirizzo;
                // controllo di validita'
                this.loginService.checkServerValidity(server)
                  .subscribe(r => {
                    if (r.result === 'OK') {
                      console.log('OK');

                      const esitoSalvataggio = this.storeService.setServer(server);
                      if (esitoSalvataggio === 1) {
                        this.presentAlert('Salvataggio server avvenuto con successo');
                      } else {
                        this.presentAlert('Si è verificato un problema nel salvataggio del server');
                      }
                    } else {
                      this.presentErrorAlert(r.ErrorMessage.msg_testo);
                    }
                  },
                    error => {
                      console.log('Errore indirizzo server sbagliato: ' + error.message);
                      this.presentServerInputAlert('Indirizzo Server Sbagliato');
                    });
              }
            }
          ]
        });
        alert.present();
      }
}
