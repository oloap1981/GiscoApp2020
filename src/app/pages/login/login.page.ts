import { BaseComponent } from './../../components/base/base.component';
// import { Error } from './../../models/shared/error.namespace';

import { Component, Inject, forwardRef, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
import { StoreService } from './../../services/store/store.service';
import { Login } from '../../models/login/login.namespace';

import { AlertService } from '../../services/shared/alert.service';
import { CommonService } from '../../services/shared/common.service';
import { Router } from '@angular/router';

/**
 * Generated class for the ComunicazioneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage extends BaseComponent {

  private userData: Login.ws_Token;

  private username = '';
  private password = '';

  // private firebase_token: string = '';
  private serverUrl = '';

  constructor(
    @Inject(forwardRef(() => LoginService)) private loginService: LoginService,
    private alertCtrl: AlertController,
    private navController: NavController,
    @Inject(forwardRef(() => StoreService)) private store: StoreService,
    public alertService: AlertService,
    public commonService: CommonService,
    public router: Router,
    public ngZone: NgZone
    ) {

    super(router, ngZone);
    this.userData = new Login.ws_Token();
  }

  public checkLogin(): void {
    const self = this;
    this.store.getServerUrl().then((url: string) => {
      if (url && url !== '') {
        self.serverUrl = url;
        self.login();
      } else {
        self.alertService.presentServerInputAlert('Indirizzo Server');
      }
    });
  }

  public login(): void {

    const self = this;
    // this.firebaseNative.getToken().then(function(fbToken){
    //   self.firebase_token = fbToken;

    //   self.loginService.login(self.serverUrl, self.username, self.password, self.firebase_token).subscribe(r => {
    //     if (r.ErrorMessage.msg_code === 0) {
    //       self.userData = r;
    //       self.store.setUserData(self.userData);

    //       self.commonService.getNotifiche(r.token_value, self.store.getLocalServerUrl()).subscribe(r => {
    //         var notifiche = r.l_notifiche;
    //         self.loginService.wakeupNotifiche(notifiche);
    //       });

    //       self.navController.setRoot(HomePage, {val: 'pippo'});
    //     } else {
    //       self.alertService.presentErrorAlert('Si è verificato un errore durante il login');
    //     }
    //   },
    //   error => {
    //     self.alertService.presentErrorAlert('Si è verificato un errore durante il login: ' + error);
    //   });
    // });

    self.loginService.login(
      self.serverUrl,
      self.username,
      self.password, '1').subscribe(r => { // quando è attivo il firebase, qui si deve passare il token di firebase
      if (r.ErrorMessage.msg_code === 0) {
        self.userData = r;
        self.store.setUserData(self.userData);

        self.commonService.getNotifiche(r.token_value, self.store.getLocalServerUrl()).subscribe(r => {
          const notifiche = r.l_notifiche;
          self.loginService.wakeupNotifiche(notifiche);
        });

        self.goToPageParams('home', { queryParams: { val: 'pippo' } });

        // self.navController.setRoot(HomePage, { val: 'pippo' });
      } else {
        self.alertService.presentErrorAlert('Si è verificato un errore durante il login');
      }
    },
      error => {
        self.alertService.presentErrorAlert('Si è verificato un errore durante il login: ' + error);
      });
  }

  async presentAlert() {
    // se serve, qui si puo' mettere una chiamata per tenere traccia di chi ha tentato e fallito il login
    const alert = this.alertCtrl.create({
      header: 'Login Failed',
      subHeader: 'Retry',
      buttons: ['Again']
    });
    (await alert).present();
  }
}
