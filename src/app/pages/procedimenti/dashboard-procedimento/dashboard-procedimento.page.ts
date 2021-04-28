import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController} from '@ionic/angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { ProcedimentiService } from '../../../services/procedimenti/procedimenti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
    selector: 'page-dashboard-procedimento',
    templateUrl: './dashboard-procedimento.page.html',
    styleUrls: ['./dashboard-procedimento.page.scss'],
  
})

export class DashboardProcedimentoPage extends BaseComponent {
    selectedProcedimento: Procedimento.Procedimento;
    fasi: Array<Procedimento.Fase>;
    personalizzazioni: Array<Procedimento.Personalizzazione>;
    whichPage: string;
    selectedFase: any;

    public visualizzaDataAvvio: boolean;
    public visualizzaDataDa: boolean;
    public visualizzaDataA: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public procedimentiService: ProcedimentiService,
        private storeService: StoreService,
        public loadingCtrl: LoadingController,
        private route: ActivatedRoute,
        public router: Router,
        public ngZone: NgZone) {
    
        super(router, ngZone);

        this.whichPage = 'Procedimento';

        this.route.queryParams.subscribe(params => {
          const p_procedimento = params['procedimento'];
          if (p_procedimento && p_procedimento !== ''){
            this.selectedProcedimento = JSON.parse(p_procedimento) as Procedimento.Procedimento;
            console.log(p_procedimento);
          }
        });

        //this.selectedProcedimento = navParams.get('procedimento');

        this.visualizzaDataAvvio = true;
        this.visualizzaDataDa = true;
        this.visualizzaDataA = true;
    }

    async ionViewDidEnter() {

        console.log('ionViewDidLoad DashboardProcedimentoPage');
        let loading = await this.loadingCtrl.create({
          message: 'Caricamento...'
        });
        loading.present();

        this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            console.log(tokenValue);
            this.procedimentiService.getProcedimento(this.storeService.getLocalServerUrl(), this.selectedProcedimento.com_procedimento_key, tokenValue).subscribe(r => {
                console.log('ionViewDidLoad DashboardProcedimentoPage getProcedimento');
                if (r.ErrorMessage.msg_code === 0) {
                    this.selectedProcedimento = r.procedimento;
                    this.gestioneVisualizzazioneDate(r.procedimento);
                    this.fasi = r.fasi;
                    this.personalizzazioni = r.personalizzazioni;
                }
                loading.dismiss();
            })
        });

    }

    private gestioneVisualizzazioneDate(procedimento: any): void {
        var dataAvvio = new Date(procedimento.pro_data_avvio);
        if (dataAvvio.getFullYear() === 1) {
            this.visualizzaDataAvvio = false;
        }
        // var dataDa = new Date(procedimento.pro_da_data_esecuzione);
        // if (dataDa.getFullYear() === 1) {
        //     this.visualizzaDataDa = false;
        // }
        // var dataA = new Date(procedimento.pro_a_data_esecuzione);
        // if (dataA.getFullYear() === 1) {
        //     this.visualizzaDataA = false;
        // }
    }

    segmentProcedimentoClicked(event) {
        console.log('segmentProcedimentoClicked');
    }

    segmentPersonalizzazioniClicked(event) {
        console.log('segmentPersonalizzazioniClicked');
    }

    segmentFasiClicked(event) {
        console.log('segmentFasiClicked');
    }

    espendiFase(event, fase, index) {
        console.log("espendiFase click");
        if (this.selectedFase == index && this.selectedFase != -1) {
            this.selectedFase = -1;
        } else
            this.selectedFase = index;
    }

    goToComunicazioni() {
        console.log("goToComunicazioni click");
        this.goToPageParams('elenco-comunicazioni',
          {
            queryParams: {
              procedimento: JSON.stringify(this.selectedProcedimento)
            }
          });
        //this.navCtrl.push(ElencoComunicazioniPage, { procedimento: this.selectedProcedimento })
    }

}

