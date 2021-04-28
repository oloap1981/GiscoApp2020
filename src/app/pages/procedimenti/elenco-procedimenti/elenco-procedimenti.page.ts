import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { ProcedimentiService } from '../../../services/procedimenti/procedimenti.service';
import { Filtro } from '../../../models/filtro/filtro.namespace';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'page-procedimenti',
  templateUrl: './elenco-procedimenti.page.html',
  styleUrls: ['./elenco-procedimenti.page.scss'],

})

export class ElencoProcedimentiPage extends BaseComponent {
  public listaProcedimenti: Array<Procedimento.Procedimento>;
  public campoLiberoSito: string;
  public campoLiberoTitolo: string;
  public numProcedimenti = 1;
  public numProcedimentiRicevuti: number;
  public tipologiaSelezionata: Filtro.TipologiaProcedimento;
  public listaTipologie: Array<Filtro.TipologiaProcedimento>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public procedimentiService: ProcedimentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.numProcedimentiRicevuti = 1;
    this.listaProcedimenti = new Array<Procedimento.Procedimento>();
    this.campoLiberoTitolo = "A";
    this.campoLiberoSito = "A";
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ElencoDocumentiPage');
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.procedimentiService.getListaTipologieProcedimento(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaTipologie = r.l_lista_tipologie;
          this.tipologiaSelezionata = this.listaTipologie[0];
          this.setTipologiaFiltro();
        }
      })
    });
  }

  public async getProcedimenti(infiniteScroll?) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.procedimentiService.getListaProcedimenti(this.storeService.getLocalServerUrl(), tokenValue, this.tipologiaSelezionata.tab_tipo_procedimento_cod, this.campoLiberoSito, this.campoLiberoTitolo,
        this.numProcedimenti, this.numProcedimenti + 19).subscribe(r => {
          console.log('getDocumenti');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numProcedimentiRicevuti = r.l_lista_procedimenti.length;
            if (!infiniteScroll) {
              this.listaProcedimenti.length = 0;
              this.listaProcedimenti = r.l_lista_procedimenti;
            } else {
              infiniteScroll.target.complete();
              this.listaProcedimenti.push(...r.l_lista_procedimenti);
            }
            console.log("getProcedimenti num ricevuti", r.l_lista_procedimenti.length);
            console.log("getProcedimenti totali", this.listaProcedimenti.length);
          }
          loading.dismiss();
        });
    });
  }

  public setTitoloFiltro(event) {
    if (event != undefined) {
      this.campoLiberoTitolo = event.value;
    }
    if (this.campoLiberoTitolo === "") {
      this.campoLiberoTitolo = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }

  public setSitoFiltro(event) {
    if (event != undefined) {
      this.campoLiberoSito = event.value;
    }
    if (this.campoLiberoSito === "") {
      this.campoLiberoSito = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }


  public setTipologiaFiltro() {
    if (this.tipologiaSelezionata.tab_tipo_procedimento_cod == 0) {
      this.tipologiaSelezionata.tab_tipo_procedimento_cod = "A";
    }
    this.numProcedimenti = 1;
    this.getProcedimenti();
  }

  loadMore(infiniteScroll) {
    this.numProcedimenti = this.numProcedimenti + 20;
    if (this.numProcedimentiRicevuti >= 20) {
      this.getProcedimenti(infiniteScroll);
    } else {
      infiniteScroll.target.complete();
    }
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, procedimento) {
    console.log("goToDetails click" + procedimento);
    this.goToPageParams('dashboard-procedimento',
      {
        queryParams: {
          procedimento: JSON.stringify(procedimento)
        }
      });
    //this.navCtrl.push(DashboardProcedimentoPage, { procedimento: procedimento })
  }

}

