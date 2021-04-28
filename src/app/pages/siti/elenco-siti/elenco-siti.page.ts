import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';

import { Sito } from '../../../models/sito/sito.namespace';
import { SitiService } from '../../../services/siti/siti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'page-elenco-siti',
  templateUrl: './elenco-siti.page.html',
  styleUrls: ['./elenco-siti.page.scss'],
})

export class ElencoSitiPage extends BaseComponent {
  public listaSiti: Array<Sito.Sito>;
  public numSiti = 1;
  public numSitiRicevuti: number;
  public listaProvince: Array<Filtro.Provincia>;
  public listaTipologie: Array<Filtro.TipologiaSito>;
  public tipologiaSelezionata: Filtro.TipologiaSito;
  public provinciaSelezionata: Filtro.Provincia;
  public campoLibero: string;

  constructor(public navParams: NavParams,
    public sitiService: SitiService,
    private storeService: StoreService,
    private navCtr: NavController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public ngZone: NgZone) 
  {
    super(router, ngZone);

    this.listaSiti = new Array<Sito.Sito>();
    this.campoLibero = "A";
    this.tipologiaSelezionata = new Filtro.TipologiaSito();
    this.provinciaSelezionata = new Filtro.Provincia();

  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter ElencoSitiPage');
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      console.log(tokenValue);

      // this.sitiService.getListaSitiAll(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
      //   console.log('ionViewDidEnter getListaSiti');
      //   if (r.ErrorMessage.msg_code === 0) {
      //     console.log(r.ErrorMessage.msg_code);
      //     this.listaSiti = r.l_lista_siti;
      //   }
      //   loading.dismiss();
      // })

      this.sitiService.getListaTipologieSito(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
        }
      })

      this.sitiService.getListaProvinceSito(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaProvince = r.l_dropdown;
          this.provinciaSelezionata = this.listaProvince[0];
        }
      })

      loading.dismiss();
      
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, sito) {
    this.goToPageParams('dashboard-sito',
      {
        queryParams: {
          p_sito: JSON.stringify(sito)
        }
      });
    //this.navCtr.push(DashboardSitoPage, { sito: sito })
  }

  public setSitoFiltro(event) {
    if (event != undefined) {
      this.campoLibero = event.target.value;
    }
    if (this.campoLibero === "") {
      this.campoLibero = "A";
    }
    this.numSiti = 1;
    this.getSiti();
  }

  public setDDLFiltro() {
    if (this.tipologiaSelezionata.tab_tipologia_sito_key === 0) {
      this.tipologiaSelezionata.tab_tipologia_sito_key = "A"
    }
    if (this.provinciaSelezionata.Codice === "") {
      this.provinciaSelezionata.Codice = "A"
    }
    this.numSiti = 1;
    this.getSiti();
  }

  public async getSiti(infiniteScroll?) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;

      this.sitiService.getListaSiti(
        this.storeService.getLocalServerUrl(), 
        tokenValue, 
        this.tipologiaSelezionata.tab_tipologia_sito_key, 
        this.provinciaSelezionata.Codice, 
        this.campoLibero,
        this.numSiti,
        this.numSiti+19
        ).subscribe(r => {
        console.log('ionViewDidLoad getListaSiti');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          if (!infiniteScroll) {
            this.listaSiti.length = 0;
            this.listaSiti = r.l_lista_siti;
          } else {
            infiniteScroll.target.complete();
            this.listaSiti.push(...r.l_lista_siti);
          }
          this.numSitiRicevuti = r.l_lista_siti.length;
          console.log("getSiti listaSiti", this.listaSiti.length);
        }
        loading.dismiss();
      })
    });
    console.log("tipologia", this.tipologiaSelezionata);
    console.log("provincia", this.provinciaSelezionata);
    console.log("campo", this.campoLibero);

  }

  loadMore(infiniteScroll) {
    this.numSiti = this.numSiti + 20;
    if (this.numSitiRicevuti >= 20) {
      this.getSiti(infiniteScroll);
    } else {
      infiniteScroll.target.complete();
    }
  }
}

