import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';

import { StoreService } from '../../../services/store/store.service';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';

import { Dispositivo } from '../../../models/dispositivo/dispositivo.namespace';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { DashboardDispositivoPage } from '../dashboard-dispositivo/dashboard-dispositivo.page';


@Component({
    selector: 'page-mappa-dispositivi',
    templateUrl: './mappa-dispositivi.page.html',
    styleUrls: ['./mappa-dispositivi.page.scss'],
  
})

export class MappaDispositiviPage extends BaseComponent {

    public listaDispositivi: Array<Dispositivo.Dispositivo>;
    //public listaProvince: Array<Filtro.Provincia>;
    public listaTipologie: Array<Filtro.TipologiaDispositivo>;
    public tipologiaSelezionata: Filtro.TipologiaDispositivo;
    //public provinciaSelezionata: Filtro.Provincia;
    public campoLibero: string;

    public mapModel: Common.MapModel;

    public showMap: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storeService: StoreService,
        public dispositiviService: DispositiviService,
        public loadingCtrl: LoadingController,
        public router: Router,
        public ngZone: NgZone) 
      {
        super(router, ngZone);
        this.listaDispositivi = new Array<Dispositivo.Dispositivo>();
        this.campoLibero = "A";

        var mapMarkers: Common.MapMarker[] = [];
        this.mapModel = new Common.MapModel();
        this.mapModel.markers = mapMarkers;

        this.showMap = false;

    }

    async ionViewDidEnter() {
        console.log('ionViewDidLoad MappaDispositiviPage');
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();
        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.dispositiviService.getListaDispositiviAll(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
                console.log('ionViewDidLoad getListaDispositivi');
                if (r.ErrorMessage.msg_code === 0) {
                    this.listaDispositivi = r.l_lista_dispositivi;

                    //genero il modello da passare al componente MAPPA
                    this.mapModel.centerLat = parseFloat(r.mp_latitude);
                    this.mapModel.centerLon = parseFloat(r.mp_longitude);
                    this.mapModel.initialZoom = parseFloat(r.mp_zoom);
                    this.mapModel.type = "roadmap";
                    console.log("mp_latitude:" + r.mp_latitude);
                    console.log("mp_longitude:" + r.mp_longitude);
                    console.log("mp_zoom:" + r.mp_zoom);


                    for (let dispositivo of this.listaDispositivi) {
                        var marker = new Common.MapMarker();

                        marker.lat = dispositivo.dis_baricentro_n;
                        marker.lgn = dispositivo.dis_baricentro_e;
                        //marker.lab = dispositivo.dis_titolo;
                        marker.draggable = false;
                        this.mapModel.markers.push(marker);
                    }

                    this.showMap = true;
                }
                loading.dismiss();
            })

            this.dispositiviService.getListaTipologieDispositivo(this.storeService.getLocalServerUrl(), tokenValue, '0').subscribe(r => {
                if (r.ErrorMessage.msg_code === 0) {
                    console.log(r.ErrorMessage.msg_code);
                    this.listaTipologie = r.l_lista_tipologie;
                    this.tipologiaSelezionata = this.listaTipologie[0];
                }
            })

            // this.dispositiviService.getListaProvinceDispositivo(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
            //     if (r.ErrorMessage.msg_code === 0) {
            //         console.log(r.ErrorMessage.msg_code);
            //         this.listaProvince = r.l_dropdown;
            //         this.provinciaSelezionata = this.listaProvince[0];
            //     }
            // })

        });
    }

    //navigazione verso la dashboard dello specifico sito selezionato
    public goToDetailsDispositivo(event) {
        var dispositivoSelezionato = this.listaDispositivi[parseInt(event)];
        this.goToPageParams('dashboard-dispositivo',
        {
          queryParams: {
            dispositivo: JSON.stringify(dispositivoSelezionato)
          }
        });
    }

    public async getDispositivi(event) {
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();
        if (event != undefined) {
            this.campoLibero = event.value;
        }
        if (this.campoLibero === "") {
            this.campoLibero = "A";
        }
        if (this.tipologiaSelezionata.tab_tipo_dispositivo_cod === 0) {
            this.tipologiaSelezionata.tab_tipo_dispositivo_cod = "A"
        }
        // if (this.provinciaSelezionata.Codice === "") {
        //     this.provinciaSelezionata.Codice = "A"
        // }

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;

            //this.provinciaSelezionata.Codice
            this.dispositiviService.getListaDispositivi(this.storeService.getLocalServerUrl(), tokenValue, this.tipologiaSelezionata.tab_tipo_dispositivo_cod,
                "A", this.campoLibero, 0, 0).subscribe(r => {
                    console.log('ionViewDidLoad getListaDispositivi');
                    if (r.ErrorMessage.msg_code === 0) {
                        console.log(r.ErrorMessage.msg_code);
                        this.listaDispositivi = r.l_lista_dispositivi;
                        console.log("getListaDispositivi listaDispositivi", this.listaDispositivi.length);

                        this.mapModel.markers.length = 0;

                        for (let dispositivo of this.listaDispositivi) {
                            var marker = new Common.MapMarker();

                            marker.lat = dispositivo.dis_baricentro_n;
                            marker.lgn = dispositivo.dis_baricentro_e;
                            //marker.lab = dispositivo.az_ragione_sociale;
                            marker.draggable = false;

                            this.mapModel.markers.push(marker);
                        }
                    }
                    loading.dismiss();
                })
        });
        console.log("tipologia", this.tipologiaSelezionata);
        //console.log("provincia", this.provinciaSelezionata);
        console.log("campo", this.campoLibero);
    }
}

