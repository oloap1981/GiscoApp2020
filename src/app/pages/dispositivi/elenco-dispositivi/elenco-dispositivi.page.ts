import { Component, NgZone } from '@angular/core';
import { NavParams, LoadingController, NavController } from '@ionic/angular';

import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
    selector: 'page-elenco-dispositivi',
    templateUrl: './elenco-dispositivi.page.html',
    styleUrls: ['./elenco-dispositivi.page.scss'],    
})

export class ElencoDispositiviPage extends BaseComponent {

    public listaDispositivi: Array<Dispositivo.Dispositivo>;
    public numDispositivi = 1;
    public numDispositiviRicevuti: number;
    public listaProvince: Array<Filtro.Provincia>;
    public listaTipologie: Array<Filtro.TipologiaDispositivo>;
    public tipologiaSelezionata: Filtro.TipologiaDispositivo;
    public provinciaSelezionata: Filtro.Provincia;
    public campoLibero: string;

    constructor(public navParams: NavParams,
        public dispositiviService: DispositiviService,
        private storeService: StoreService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public router: Router,
        public ngZone: NgZone) 
      {
        super(router, ngZone);
        this.listaDispositivi = new Array<Dispositivo.Dispositivo>();
        this.campoLibero = "A";
        this.tipologiaSelezionata = new Filtro.TipologiaDispositivo();
        this.provinciaSelezionata = new Filtro.Provincia();
    }

    async ionViewDidEnter() {
        console.log('ionViewDidLoad ElencoDispositiviPage');
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);

            // this.dispositiviService.getListaDispositiviAll(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
            //     console.log('ionViewDidLoad getListaDispositivi');
            //     if (r.ErrorMessage.msg_code === 0) {
            //         console.log(r.ErrorMessage.msg_code);
            //         this.listaDispositivi = r.l_lista_dispositivi;
            //     }
            //     loading.dismiss();
            // })

            this.dispositiviService.getListaTipologieDispositivo(this.storeService.getLocalServerUrl(), tokenValue, '0').subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaTipologie = r.l_lista_tipologie;
                    this.tipologiaSelezionata = this.listaTipologie[0];
                }
            })

            this.dispositiviService.getListaProvinceDispositivo(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaProvince = r.l_dropdown;
                    this.provinciaSelezionata = this.listaProvince[0];
                }
            })

            loading.dismiss();
        });
    }

    goToDetails(event, dispositivo) {
      this.goToPageParams('dashboard-dispositivo',
      {
        queryParams: {
          dispositivo: JSON.stringify(dispositivo)
        }
      });
    }

    public setSitoFiltro(event) {
      if (event != undefined) {
        this.campoLibero = event.target.value;
      }
      if (this.campoLibero === "") {
        this.campoLibero = "A";
      }
      this.numDispositivi = 1;
      this.getDispositivi();
    }
  
    public setDDLFiltro() {
      if (this.tipologiaSelezionata.tab_tipo_dispositivo_cod === 0) {
        this.tipologiaSelezionata.tab_tipo_dispositivo_cod = "A"
      }
      if (this.provinciaSelezionata.Codice === "") {
        this.provinciaSelezionata.Codice = "A"
      }
      this.numDispositivi = 1;
      this.getDispositivi();
    }

    public async getDispositivi(infiniteScroll?) {
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        if (!infiniteScroll) {
          loading.present();
        }

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;

            this.dispositiviService.getListaDispositivi(
              this.storeService.getLocalServerUrl(), 
              tokenValue, 
              this.tipologiaSelezionata.tab_tipo_dispositivo_cod, 
              this.provinciaSelezionata.Codice, 
              this.campoLibero,
              this.numDispositivi,
              this.numDispositivi+19
              ).subscribe(r => {
                console.log('ionViewDidLoad getListaDispositivi');
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    if (!infiniteScroll) {
                      this.listaDispositivi.length = 0;
                      this.listaDispositivi = r.l_lista_dispositivi;
                    } else {
                      infiniteScroll.target.complete();
                      this.listaDispositivi.push(...r.l_lista_dispositivi);
                    }
                    this.numDispositiviRicevuti = r.l_lista_dispositivi.length;
                    console.log("getListaDispositivi listaDispositivi", this.listaDispositivi.length);
                }
                loading.dismiss();
            })
        });
        console.log("tipologia", this.tipologiaSelezionata);
        console.log("provincia", this.provinciaSelezionata);
        console.log("campo", this.campoLibero);
    }

    loadMore(infiniteScroll) {
      this.numDispositivi = this.numDispositivi + 20;
      if (this.numDispositiviRicevuti >= 20) {
        this.getDispositivi(infiniteScroll);
      } else {
        infiniteScroll.target.complete();
      }
    }
}


