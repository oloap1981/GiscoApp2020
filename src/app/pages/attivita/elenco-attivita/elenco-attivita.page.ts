import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { AttivitaService } from '../../../services/attivita/attivita.service';
import { Attivita } from '../../../models/attivita/attivita.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { LoginPage } from '../../login/login.page';


@Component({
  selector: 'page-attivita',
  templateUrl: './elenco-attivita.page.html',
  styleUrls: ['./elenco-attivita.page.scss'],
})

export class ElencoAttivitaPage extends BaseComponent {
  public listaAttivita: Array<Attivita.Attivita>;
  public campoLiberoSito: string;
  public campoLiberoProtocollo: string;
  public numAttivita = 1;
  public numAttivitaRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaAttivita;
  public listaTipologie: Array<Filtro.TipologiaAttivita>;
  public categoriaSelezionata: Filtro.CategoriaAttivita;
  public listaCategorie: Array<Filtro.CategoriaAttivita>;

  public statoSelezionato: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attivitaService: AttivitaService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

    this.numAttivitaRicevuti = 1;
    this.listaAttivita = new Array<Attivita.Attivita>();
    this.campoLiberoSito = "A";
    this.campoLiberoProtocollo = "A";
    this.statoSelezionato = 'N';
  }

  async ionViewDidEnter() {
    console.log('ionViewDidLoad ElencoAttivitaPage');
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      if (val !== null) {
        var tokenValue = val.token_value;
        this.attivitaService.getListaCategorieAttivita(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.listaCategorie = r.l_lista_tipologie;
            this.categoriaSelezionata = this.listaCategorie[0];
            this.setCategoriaFiltro();
          } else {
            this.presentAlert("", "Errore caricamento categorie");
          }
          loading.dismiss();
        }, err => {
          this.presentAlert("", err.statusText);
          loading.dismiss();
        })
      } else {
        this.goToPage('login');
        loading.dismiss();
      }
    }, err => {
      this.presentAlert("", err.statusText);
      loading.dismiss();
    });
  }

  public async getAttivita(infiniteScroll?) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      //(token: string, categoria: any, tipo_cod: any, sito_cod: string, from: number, to: number)
      this.attivitaService.getListaAttivita(this.storeService.getLocalServerUrl(), tokenValue, this.categoriaSelezionata.tab_tipo_attivita_cod, this.tipologiaSelezionata.tab_tipo_scadenza_cod, this.campoLiberoSito, this.campoLiberoProtocollo, this.numAttivita, this.numAttivita + 19, this.statoSelezionato).subscribe(r => {
        console.log('getAttivita');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.numAttivitaRicevuti = r.l_lista_attivita.length;
          if (!infiniteScroll) {
            this.listaAttivita.length = 0;
            this.listaAttivita = r.l_lista_attivita;
          } else {
            infiniteScroll.target.complete();
            this.listaAttivita.push(...r.l_lista_attivita);
          }
          console.log("getAttivita num ricevuti", r.l_lista_attivita.length);
          console.log("getAttivita totali", this.listaAttivita.length);
        }
        loading.dismiss();
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });
    }, err => {
      this.presentAlert("", err.statusText);
      loading.dismiss();
    });
  }

  public getDotPath(osservazione: Attivita.Attivita): string {
    switch (osservazione.att_stato_attivita) {
      case 'FU':
        return '/assets/imgs/dot_blu.png';
      case 'SC':
        return '/assets/imgs/dot_giallo.png';
      case 'KO':
        return '/assets/imgs/dot_rosso.png';
      case 'OK':
        return '/assets/imgs/dot_verde.png';
      default:
        return '/assets/imgs/dot_giallo.png';
    }
  }

  public setStatoFiltro(event) {
    if (event != undefined) {
      this.statoSelezionato = event;
    }
    this.numAttivita = 1;
    this.getAttivita();
  }

  public setSitoFiltro(event) {
    if (event != undefined) {
      this.campoLiberoSito = event.value;
    }
    if (this.campoLiberoSito === "") {
      this.campoLiberoSito = "A";
    }
    this.numAttivita = 1;
    this.getAttivita();
  }

  public setProtocolloFiltro(event) {
    if (event != undefined) {
      this.campoLiberoProtocollo = event.value;
    }
    if (this.campoLiberoProtocollo === "") {
      this.campoLiberoProtocollo = "A";
    }
    this.numAttivita = 1;
    this.getAttivita();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_scadenza_cod == 0) {
      this.tipologiaSelezionata.tab_tipo_scadenza_cod = "A";
    }
    this.numAttivita = 1;
    this.getAttivita();
  }

  public async setCategoriaFiltro() {
    if (this.categoriaSelezionata.tab_tipo_attivita_cod == 0) {
      this.categoriaSelezionata.tab_tipo_attivita_cod = "A";
    }
    this.numAttivita = 1;
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.attivitaService.getListaTipologieAttivita(this.storeService.getLocalServerUrl(), this.categoriaSelezionata.tab_tipo_attivita_cod, tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
          this.setTipologiaFiltro();
        } else {
          this.presentAlert("", "Errore caricamento tipologie");
        }
        loading.dismiss();
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });
    }, err => {
      this.presentAlert("", err.statusText);
      loading.dismiss();
    });
  }

  loadMore(infiniteScroll) {
    this.numAttivita = this.numAttivita + 20;
    if (this.numAttivitaRicevuti >= 20) {
      this.getAttivita(infiniteScroll);
    } else {
      infiniteScroll.target.complete();
    }
  }

  public goToDetails(attivita: Attivita.Attivita) {
    console.log("goToDetails click " + attivita);
    this.goToPageParams('dashboard-attivita',
      {
        queryParams: {
          selectedAttivita: JSON.stringify(attivita)
        }
      });
    //this.navCtrl.push(DashboardAttivitaPage, { selectedAttivita: attivita, callbackChiusa: this.chiusaCallbackFunction });
  }

  public get_data_scadenza(attivita: Attivita.Attivita): string {
    var value_data = attivita.att_data_scadenza;
    if (attivita.att_data_scadenza.includes("0001")){
      value_data = attivita.att_data_fine_prev;
      }
    return value_data;
  }

  // public chiusaCallbackFunction = (attivita_key: number) => {
  //   return new Promise((resolve, reject) => {
  //     console.log("goToDetails click " + attivita_key);
  //     if (attivita_key != undefined) {
  //       var p: Attivita.Attivita = this.listaAttivita.find(item => item.attivita_key == attivita_key)
  //       console.log("goToDetails click " + JSON.stringify(p));
  //       p.att_conclusa = "S"
  //       p.att_stato_attivita = "OK"
  //       resolve();
  //     }
  //   });
  // }

  /*   return new Promise((resolve, reject) => {
      
       console.log("Attivita conclusa callback " + reload);
       resolve();
     });*/


  // back() {
  //   this.navCtrl.pop();
  // }


  async presentAlert(title: string, mess: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    alert.present();
  }



}

