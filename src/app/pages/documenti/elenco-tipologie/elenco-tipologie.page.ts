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
  selector: 'page-tipologie',
  templateUrl: 'elenco-tipologie.page.html',
  styleUrls: ['elenco-tipologie.page.scss']
})

export class ElencoTipologiePage extends BaseComponent {
  public listaCartelle: Array<Documento.Cartella>;
  public selectedCartella: Documento.Cartella;

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


    this.listaCartelle = new Array<Documento.Cartella>();
  }

  async ionViewDidEnter() {

    // this.selectedCartella = navParams.get('cartella');

    this.route.queryParams.subscribe(params => {
      const selectedCartellaString = params['cartella'];
      if (selectedCartellaString && selectedCartellaString !== '') {
        this.selectedCartella = JSON.parse(selectedCartellaString) as Documento.Cartella;
      }
    });

    console.log('ionViewDidLoad CartellePage');
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      const tokenValue = val.token_value;
      console.log(tokenValue);
      this.documentiService.getTipologiaDocumenti(this.storeService.getLocalServerUrl(),
      tokenValue, this.selectedCartella.doc_foreign_type).subscribe(r => {
        console.log('ionViewDidLoad getCartelle');
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaCartelle = r.l_lista_cartelle;
        }
        loading.dismiss();
      });
    });
  }

  // navigazione verso la dashboard dello specifico sito selezionato
  public goToElencoDocumenti(event, cartella) {
    this.goToPageParams('elenco-documenti',
      {
        queryParams: {
          cartella: JSON.stringify(cartella)
          // callbackReload: this.reloadListaCallbackFunction
        }
      });
    // this.navCtrl.push(ElencoDocumentiPage, { cartella });
  }

}
