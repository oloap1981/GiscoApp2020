import { BaseComponent } from 'src/app/components/base/base.component';

import { Component, NgZone } from '@angular/core';
import { Platform, MenuController, AlertController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Storage } from '@ionic/storage';

import { CommonService } from './services/shared/common.service';
import { StoreService } from './services/store/store.service';
import { AlertService } from './services/shared/alert.service';
import { LoginService } from './services/login/login.service';

import { Login } from './models/login/login.namespace';
import { Common } from './models/common/common.namespace';
import { Router } from '@angular/router';

// import { FirebaseX } from '@ionic-native/firebase-x/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent extends BaseComponent {

  public pages: Array<{ title: string, name: string, icon: any }>;
  // private pagineSenzaMenu: Array<string> = new Array("LoadingPage", "LoginPage");

  private numNotifiche_attivita = 0;
  private numNotifiche_osservazioni = 0;
  private numNotifiche_prescrizioni = 0;
  private numNotifiche_messaggi = 0;
  private numNotifiche_commenti_at = 0;
  private numNotifiche_commenti_os = 0;

  public viewMenu = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    private storage: Storage,
    public splashScreen: SplashScreen,
    public commonService: CommonService,
    public storeService: StoreService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    // public firebaseNative: FirebaseX,
    public alertService: AlertService,
    public loginService: LoginService,
    public router: Router,
    public ngZone: NgZone
  ) {

    super(router, ngZone);

    this.loginService.notifiche.subscribe(not => {
      this.manageNotifiche(not);
    });

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.initializeApp();
    });
  }

  async initializeApp() {

    this.pages = [
      { title: 'Home', name: 'home', icon: 'home' },
    ];

    this.storeService.initializeServerUrl();

    let piattaforma = '';
    if (this.platform.is('mobileweb')) {
      piattaforma = 'mobileweb';
    }
    if (this.platform.is('ios')) {
      piattaforma = 'ios';
    }
    if (this.platform.is('android')) {
      piattaforma = 'android';
    }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    // carico le notifiche per le pagine nel menu
    this.storeService.getServerUrl().then((url: string) => {
      if (url) {
        this.storeService.getUserDataPromise(url).then((val: Login.ws_Token) => {
          if (val != null) {
            const tokenValue = val.token_value;
            this.commonService.getNotifiche(tokenValue, this.storeService.getLocalServerUrl()).subscribe(r => {
              const notifiche = r.l_notifiche;
              this.manageNotifiche(notifiche);
              console.log('ADESSO POSSO RENDERIZZARE LA LISTA');
            }, error => {
              console.log('Errore nel recupero delle notifiche: ' + error.message);
              this.viewMenu = true;
            });
          } else {
            // devo effettuare il login
            this.goToPage('login');
          }
        });
      } else {
        this.goToPage('login');
      }
    });


    // Listen to incoming messages
    // this.firebaseNative.onMessageReceived().subscribe(message => {
    //   let id = 0;
    //   console.log("TIPO NOTIFICA: " + message.tipo_notifica);
    //   this.alertService.presentAlertNewPage(this.nav, message.tipo_notifica, id);
    // });
  }

  private manageNotifiche(notifiche: Common.NotificaList[]): void {
    for (const notifica of notifiche) {
      switch (notifica.notifica_type) {
        case 'attivita': {
          if (notifica.notifica_count) {
            this.numNotifiche_attivita = notifica.notifica_count;
          }
          break;
        }
        case 'osservazioni': {
          if (notifica.notifica_count) {
            this.numNotifiche_osservazioni = notifica.notifica_count;
          }
          break;
        }
        case 'prescrizioni': {
          if (notifica.notifica_count) {
            this.numNotifiche_prescrizioni = notifica.notifica_count;
          }
          break;
        }
        case 'messaggi': {
          if (notifica.notifica_count) {
            this.numNotifiche_messaggi = notifica.notifica_count;
          }
          break;
        }
        case 'commenti_at': {
          if (notifica.notifica_count) {
            this.numNotifiche_commenti_at = notifica.notifica_count;
          }
          break;
        }
        case 'commenti_os': {
          if (notifica.notifica_count) {
            this.numNotifiche_commenti_os = notifica.notifica_count;
          }
          break;
        }
      }
    }
    this.viewMenu = true;
  }

  public logOut() {
    this.storage.clear();
    this.menu.close();
    this.goToPage('login');
  }

  public goToSettings() {
    this.menu.close();
    this.goToPage('login');
  }

  public getNumeroNotifiche(titolo: string): string {
    let toReturn = '';
    switch (titolo) {
      case 'Attività':
        if (this.numNotifiche_attivita > 0) {
          toReturn = this.numNotifiche_attivita + '';
        }
        break;
      case 'Osservazioni':
        if (this.numNotifiche_osservazioni > 0) {
          toReturn = this.numNotifiche_osservazioni + '';
        }
        break;
      case 'Prescrizioni':
        if (this.numNotifiche_prescrizioni > 0) {
          toReturn = this.numNotifiche_prescrizioni + '';
        }
        break;
      case 'Messaggi':
        if (this.numNotifiche_messaggi > 0) {
          toReturn = this.numNotifiche_messaggi + '';
        }
        break;
      case 'Commenti Attivita':
        if (this.numNotifiche_commenti_at > 0) {
          toReturn = this.numNotifiche_commenti_at + '';
        }
        break;
      case 'Commenti Osservazioni':
        if (this.numNotifiche_commenti_os > 0) {
          toReturn = this.numNotifiche_commenti_os + '';
        }
        break;
      default:
        toReturn = '';
        break;
    }

    return toReturn;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.goToPage(page.name);
  }

}
