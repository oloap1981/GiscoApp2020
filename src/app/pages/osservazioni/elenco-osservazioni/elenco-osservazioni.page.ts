import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { Router } from '@angular/router';
import { LoginPage } from '../../login/login.page';
import { DashboardOsservazionePage } from '../dashboard-osservazione/dashboard-osservazione.page';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-osservazioni',
  templateUrl: 'elenco-osservazioni.page.html',
})

export class ElencoOsservazioniPage extends BaseComponent{
  public listaOsservazioni: Array<Osservazione.Osservazione>;
  public campoLiberoSito: string;
  public campoLiberoProtocollo: string;
  public numOsservazioni = 1;
  public numOsservazioniRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaOsservazione;
  public listaTipologie: Array<Filtro.TipologiaOsservazione>;

  public statoSelezionato: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public osservazioniService: OsservazioniService,
              private storeService: StoreService,
              public loadingCtrl: LoadingController,
              public router: Router,
              public ngZone: NgZone) {

    super(router, ngZone);
    this.numOsservazioniRicevuti = 1;
    this.listaOsservazioni = new Array<Osservazione.Osservazione>();
    this.campoLiberoSito = 'A';
    this.campoLiberoProtocollo = 'A';
    this.statoSelezionato = 'N';
  }

  async ionViewDidEnter() {
    console.log('ionViewDidLoad ElencoOsservazioniPage');
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      if (val !== null) {
        const tokenValue = val.token_value;
        this.osservazioniService.getListaTipologieOsservazione(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.listaTipologie = r.l_lista_tipologie;
            this.tipologiaSelezionata = this.listaTipologie[0];
            this.setTipologiaFiltro();
          }
          loading.dismiss();
        });
      } else {
        this.goToPage('login');
        loading.dismiss();
      }
    });
  }

  public async getOsservazioni(infiniteScroll?) {
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      const tokenValue = val.token_value;
      this.osservazioniService.getListaOsservazioni(
        this.storeService.getLocalServerUrl(),
        tokenValue,
        this.tipologiaSelezionata.tab_tipo_scadenza_cod,
        this.campoLiberoSito,
        this.campoLiberoProtocollo,
        this.numOsservazioni,
        this.numOsservazioni + 19,
        this.statoSelezionato).subscribe(r => {
          console.log('getOsservazioni');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numOsservazioniRicevuti = r.l_lista_osservazioni.length;
            if (!infiniteScroll) {
              this.listaOsservazioni.length = 0;
              this.listaOsservazioni = r.l_lista_osservazioni;
            } else {
              infiniteScroll.complete();
              this.listaOsservazioni.push(...r.l_lista_osservazioni);
            }
            console.log('getOsservazioni num ricevuti', r.l_lista_osservazioni.length);
            console.log('getOsservazioni totali', this.listaOsservazioni.length);
          }
          loading.dismiss();
        });
    });
  }

  public getDotPath(osservazione: Osservazione.Osservazione): string {
    switch (osservazione.att_stato_attivita) {
      case 'KO':
        return '/assets/imgs/dot_rosso.png';
      case 'OK':
        return '/assets/imgs/dot_verde.png';
      default:
        return '/assets/imgs/dot_verde.png';
    }
  }

  public setStatoFiltro(event) {
    if (event !== undefined) {
      this.statoSelezionato = event;
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }

  public setSitoFiltro(event) {
    if (event !== undefined) {
      this.campoLiberoSito = event.value;
    }
    if (this.campoLiberoSito === '') {
      this.campoLiberoSito = 'A';
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }

  public setProtocolloFiltro(event) {
    if (event !== undefined) {
      this.campoLiberoProtocollo = event.value;
    }
    if (this.campoLiberoProtocollo === '') {
      this.campoLiberoProtocollo = 'A';
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_scadenza_cod === 0) {
      this.tipologiaSelezionata.tab_tipo_scadenza_cod = 'A';
    }
    this.numOsservazioni = 1;
    this.getOsservazioni();
  }

  loadMore(infiniteScroll) {
    this.numOsservazioni = this.numOsservazioni + 20;
    if (this.numOsservazioniRicevuti >= 20) {
      this.getOsservazioni(infiniteScroll);
    } else {
      infiniteScroll.target.complete();
    }
  }

  public goToDetails(osservazione: Osservazione.Osservazione) {
    console.log('goToDetails click ' + osservazione.attivita_key);
    this.goToPageParams('dashboard-osservazione',
      {
        queryParams: {
          selectedOsservazione: JSON.stringify(osservazione),
          callbackReload: this.reloadListaCallbackFunction
        }
      });
    // this.navCtrl.push(DashboardOsservazionePage,
    // { selectedOsservazione: osservazione, callbackReload: this.reloadListaCallbackFunction });
  }

  public goToNuovaOsservazione() {
    console.log('goToNuovaOsservazione click');
    this.goToPageParams('dashboard-osservazione',
      {
        queryParams: {
          selectedOsservazione: undefined,
          callbackReload: this.reloadListaCallbackFunction
        }
      });
    // this.navCtrl.push(DashboardOsservazionePage, { selectedOsservazione: undefined, callbackReload: this.reloadListaCallbackFunction });
  }

  reloadListaCallbackFunction = (reload, oss: Osservazione.Osservazione) => {
    return new Promise((resolve, reject) => {
      //  this.test = _params;
      if (reload) {
        this.numOsservazioni = 1;
        this.getOsservazioni();
      }
      console.log('nuovaOssCallbackFunction ' + reload);
      resolve();
    });
  }

  back() {
    this.navCtrl.pop();
  }
}
