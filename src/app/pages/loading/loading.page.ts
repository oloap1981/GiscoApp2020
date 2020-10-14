import { StoreService } from './../../services/store/store.service';
import { Component, NgZone } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Login } from '../../models/login/login.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.page.html',
})
export class LoadingPage extends BaseComponent {

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              private store: StoreService,
              public router: Router,
              public ngZone: NgZone
  ) {

    super(router, ngZone);
  }
  ionViewDidLoad() {
    this.presentLoadingDefault();
    this.store.getServerUrl().then((url: string) => {

      if (url) {
        this.store.getUserDataPromise(url).then((val: Login.ws_Token) => {
          if (val != null) {
            this.goToPage('home');
          } else {
            this.goToPage('login');
          }
        }
        );
      } else {
        this.goToPage('login');
      }
    });
  }

  async presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      message: 'Please wait...'
    });

    (await loading).present();

    setTimeout(async () => {
      (await loading).dismiss();
    }, 1000);
  }
}
