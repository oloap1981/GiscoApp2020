import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';

import { Dipendente } from '../../../models/dipendente/dipendente.namespace';
import { ProfiloService } from '../../../services/profilo/profilo.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'page-dashboard-profilo',
    templateUrl: './dashboard-profilo.page.html',
    styleUrls: ['./dashboard-profilo.page.scss'],
  
})

export class DashboardProfiloPage extends BaseComponent {
    private imageURI: any;
    private profilo: Dipendente.Dipendente;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public profiloService: ProfiloService,
        private storeService: StoreService,
        private camera: Camera,
        private actionSheetCtrl: ActionSheetController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public router: Router,
        public ngZone: NgZone) {
    
        super(router, ngZone);
        this.profilo = new Dipendente.Dipendente();
    }

    async ionViewDidEnter() {
        console.log('ionViewDidLoad DashboardProfiloPage');
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log("val " + val.token_dipendente_key);
            this.profiloService.getProfilo(this.storeService.getLocalServerUrl(), val.token_dipendente_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardProfiloPage getProfilo');
                console.log("facebook " + r);
                if (r.ErrorMessage.msg_code === 0) {
                    this.profilo = r.dipendente;
                    console.log("this.profilo.nome " + this.profilo.nome);
                } else {
                    console.log("errore " + r.ErrorMessage.msg_testo);
                    this.presentAlert("", "errore modifica avatar")
                }
                loading.dismiss();
            })
        });
    }

    async presentActionSheet() {
        let actionSheet = await this.actionSheetCtrl.create({
          header: 'Modifica avatar',
          buttons: [
            {
              text: 'Galleria',
              handler: () => {
                this.changeAvatar("gallery");
              }
            },
            {
              text: 'Fotocamera',
              handler: () => {
                this.changeAvatar("camera");
              }
            },
            {
              text: 'Annulla',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
    }

    changeAvatar(mode) {
        let options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        if (mode == "camera") {
            options = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA
            }
        }

        this.camera.getPicture(options).then(async (imageData) => {
            let loading = await this.loadingCtrl.create({
              message: 'Caricamento...'
            });
            loading.present();
            this.imageURI = imageData;
            this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
                this.profiloService.changeAvatar(this.storeService.getLocalServerUrl(), this.imageURI, val).subscribe((r) => {
                    console.log(r);
                    if (r.ErrorMessage.msg_code == 0) {
                        this.profilo.url_avatar = this.imageURI;
                    } else {
                        this.presentAlert("", "errore modifica avatar")
                    }
                    loading.dismiss();
                });
            })
        }, (err) => {
            console.log(err);
        });

    }

    public async changePassword() {
        const prompt = await this.alertCtrl.create({
          header: 'Cambio Password',
          subHeader: "inserisci i dati",
          inputs: [
            {
              name: 'old',
              placeholder: 'Password corrente'
            },
            {
              name: 'new',
              placeholder: 'Nuova password'
            },
            {
              name: 'repeat',
              placeholder: 'Reinserisci nuova password'
            },
          ],
          buttons: [
            {
              text: 'Cancella',
              handler: data => { }
            },
            {
              text: 'Conferma',
              handler: data => {
                if (this.checkPassword(data.old) == true) {
                  if (data.new.length > 5) {
                    if (data.new == data.repeat) {
                      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
                        var tokenValue = val.token_value;
                        this.profiloService.changePassword(this.storeService.getLocalServerUrl(), tokenValue, data.old, data.new, data.repeat).subscribe((r) => {
                          if (r.ErrorMessage.msg_code == 0) {
                            this.presentAlert("", "password cambiata correttamente");
                          } else {
                            console.log(r);
                            this.presentAlert("", "errore modifica password");
                          }
                        });
                      });
                    } else {
                      this.presentAlert("", "le password non corrispondono");
                    }
                  } else {
                    this.presentAlert("", "la password deve essere più lunga di 5 caratteri");
                  }
                } else {
                  this.presentAlert("", "password corrente non corretta");
                }
              }
            }
          ]
        });
        prompt.present();
    }

    checkPassword(old): boolean {
        return true;
    }
    
    async presentAlert(title: string, mess: string) {
        let alert = await this.alertCtrl.create({
          header: title,
          subHeader: mess,
          buttons: ['Ok']
        });
        alert.present();
    }

}
