import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from '@ionic/angular';
import { Sito } from '../../../models/sito/sito.namespace';

import { SitiService } from '../../../services/siti/siti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Common } from '../../../models/common/common.namespace';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
    selector: 'page-dashboard-sito',
    templateUrl: './dashboard-sito.page.html',
    styleUrls: ['./dashboard-sito.page.scss'],
  
})

export class DashboardSitoPage extends BaseComponent {
    selectedSito: Sito.Sito;
    catastale: Array<Sito.Catastale>;
    procedimenti: Array<Sito.Procedimento>;
    whichPage: string;
    public mapModel: Common.MapModel;

    public showMap: boolean;
    public heightMap = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public sitiService: SitiService,
        private storeService: StoreService,
        public loadingCtrl: LoadingController,
        private route: ActivatedRoute,
        public router: Router,
        public ngZone: NgZone,
        public platform: Platform) 
        {

        super(router, ngZone);

        var mapMarkers: Common.MapMarker[] = [];
        this.mapModel = new Common.MapModel();
        this.mapModel.markers = mapMarkers;
        this.selectedSito = new Sito.Sito();

        this.showMap = false;
        this.heightMap = platform.height()-108;

    }

    async ionViewDidEnter() {

        console.log('ionViewDidLoad DashboardSitoPage');
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();

        //this.selectedSito = navParams.get('sito');
        this.route.queryParams.subscribe(params => {
          const p_selectedSito = params['p_sito'];
          if (p_selectedSito && p_selectedSito !== ''){
            this.selectedSito = JSON.parse(p_selectedSito) as Sito.Sito;
          }
        });

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.whichPage = 'Sito';
            this.sitiService.getSito(this.storeService.getLocalServerUrl(), this.selectedSito.azienda_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardSitoPage getSito');
                if (r.ErrorMessage.msg_code === 0) {
                    this.selectedSito = r.sito;
                    this.catastale = r.catastale_situazione;
                    this.procedimenti = r.prescrizioni_situazione;
                    var marker = new Common.MapMarker();

                    marker.lat = this.selectedSito.az_baricentro_n;
                    marker.lgn = this.selectedSito.az_baricentro_e;
                    //marker.lab = this.selectedSito.az_ragione_sociale;
                    marker.draggable = false;
                    this.mapModel.markers.push(marker);

                    this.mapModel.centerLat = marker.lat;
                    this.mapModel.centerLon = marker.lgn;
                    this.mapModel.initialZoom = parseFloat(r.mp_zoom);
                    this.mapModel.type = "satellite";
                    
                    this.showMap = true;
                }
                loading.dismiss();
            })
        });
    }

    segmentSitoClicked(event) {
        console.log('segmentSitoClicked');
    }

    segmentCatastaleClicked(event) {
        console.log('segmentCatastaleClicked ' + this.catastale);
    }

    segmentProcedimentiClicked(event) {
        console.log('segmentProcedimentiClicked');
    }

    segmentGraficoClicked(event) {
        console.log('segmentGraficoClicked');
    }

    segmentMappaClicked(event) {
        console.log('segmentMappaClicked');
    }

    segmentImmaginiClicked(event) {
        console.log('segmentImmaginiClicked');
    }

    public markerClicked(event) {
        console.log('mearkerClicked');
    }


    back() {
        this.navCtrl.pop();
    }

}


