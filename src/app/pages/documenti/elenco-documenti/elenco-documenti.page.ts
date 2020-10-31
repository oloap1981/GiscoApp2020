import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-documenti',
  templateUrl: 'elenco-documenti.page.html',
  styleUrls: ['elenco-documenti.page.scss', '../../../app.component.scss']
})

export class ElencoDocumentiPage extends BaseComponent{
  public listaDocumenti: Array<Documento.Documento>;
  public selectedCartella: Documento.Cartella;
  public campoLiberoSito: string;
  public campoLiberoDocumento: string;
  public numDocumenti = 1;
  public numDocumentiRicevuti: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

    // this.selectedCartella = navParams.get('cartella');

    this.numDocumentiRicevuti = 1;
    this.listaDocumenti = new Array<Documento.Documento>();
    this.campoLiberoDocumento = 'A';
    this.campoLiberoSito = 'A';
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      const selectedCartellaString = params['cartella'];
      if (selectedCartellaString && selectedCartellaString !== '') {
        this.selectedCartella = JSON.parse(selectedCartellaString) as Documento.Cartella;
      }
    });

    console.log('ionViewDidLoad ElencoDocumentiPage');
    this.getDocumenti();
  }

  public async getDocumenti(infiniteScroll?) {
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      loading.present();
    }
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      const tokenValue = val.token_value;
      this.documentiService.getListaDocumenti(this.storeService.getLocalServerUrl(),
      tokenValue, this.selectedCartella.tab_tipo_documento_cod,
        this.selectedCartella.doc_foreign_type, this.campoLiberoSito, this.campoLiberoDocumento,
        this.numDocumenti, this.numDocumenti + 19).subscribe(r => {
          console.log('getDocumenti');
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r.ErrorMessage.msg_code);
            this.numDocumentiRicevuti = r.l_lista_documenti.length;
            if (!infiniteScroll) {
              this.listaDocumenti.length = 0;
              this.listaDocumenti = r.l_lista_documenti;
            } else {
              infiniteScroll.complete();
              this.listaDocumenti.push(...r.l_lista_documenti);
            }
            console.log('getDocumenti num ricevuti', r.l_lista_documenti.length);
            console.log('getDocumenti totali', this.listaDocumenti.length);
          }
          loading.dismiss();
        });
    });
  }

  public setDocumentoFiltro(event) {
    if (event !== undefined) {
      this.campoLiberoDocumento = event.value;
    }
    if (this.campoLiberoDocumento === '') {
      this.campoLiberoDocumento = 'A';
    }
    this.numDocumenti = 1;
    this.getDocumenti();
  }

  public setSitoFiltro(event) {
    if (event !== undefined) {
      this.campoLiberoSito = event.value;
    }
    if (this.campoLiberoSito === '') {
      this.campoLiberoSito = 'A';
    }
    this.numDocumenti = 1;
    this.getDocumenti();
  }

  loadMore(infiniteScroll) {
    this.numDocumenti = this.numDocumenti + 20;
    if (this.numDocumentiRicevuti >= 20) {
      this.getDocumenti(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  // navigazione verso la dashboard dello specifico sito selezionato
  public goToDocumento(event, documento) {
    console.log('goToDocumento click' + documento);
    this.goToPageParams('dashboard-documento',
      {
        queryParams: {
          documento: JSON.stringify(documento)
          // callbackReload: this.reloadListaCallbackFunction
        }
      });
    // this.navCtrl.push(DashboardDocumentoPage, { documento });
  }
}
