import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Router } from '@angular/router';

/**
 * Generated class for the CartellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cartelle',
  templateUrl: 'cartelle.page.html',
})
export class CartellePage extends BaseComponent {
  public listaCartelle: Array<Documento.Cartella>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.listaCartelle = new Array<Documento.Cartella>();
  }

  async ionViewDidEnter() {
    console.log('ionViewDidLoad CartellePage');
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      const tokenValue = val.token_value;
      console.log(tokenValue);
      this.documentiService.getCartelle(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
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
  public goToTipologieDocumenti(event, cartella) {
    console.log('goToTipologieDocumenti click' + cartella);
    this.goToPageParams('elenco-tipologie',
      {
        queryParams: {
          cartella: JSON.stringify(cartella)
          // callbackReload: this.reloadListaCallbackFunction
        }
      });
    // this.navCtrl.push(TipologiePage, { cartella });
  }

}
