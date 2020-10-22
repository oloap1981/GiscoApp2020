import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Documento } from '../../../models/documento/documento.namespace';
import { DocumentiService } from '../../../services/documenti/documenti.service';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * Generated class for the DashboardSitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-documento',
  templateUrl: 'dashboard-documento.page.html',
})

export class DashboardDocumentoPage extends BaseComponent{

  selectedDocumento: Documento.Documento;
  public d_url: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentiService: DocumentiService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private file: File,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

  }

  async ionViewDidEnter() {

    // this.selectedDocumento = navParams.get('documento');

    this.route.queryParams.subscribe(params => {
      const selectedDocumentoString = params['documento'];
      if (selectedDocumentoString && selectedDocumentoString !== '') {
        this.selectedDocumento = JSON.parse(selectedDocumentoString) as Documento.Documento;
      }
    });

    console.log('ionViewDidLoad DashboardSitoPage');
    const loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      const tokenValue = val.token_value;
      this.d_url = this.storeService.getLocalServerUrl() + '/app/services/get_file/' + tokenValue + '/';
      console.log(tokenValue);
      this.documentiService.getDocumento(this.storeService.getLocalServerUrl(),
      this.selectedDocumento.documenti_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad DashboardSitoPage getDocumento');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedDocumento = r.documento;
          console.log(this.selectedDocumento.doc_titolo);
        }
        loading.dismiss();
      });
    });
  }
  back() {
    this.navCtrl.pop();
  }

  openUrl() {
    window.open(this.selectedDocumento.doc_url, '_system');
  }

  public downloadFileLink() {
    const url: string = this.d_url + this.selectedDocumento.doc_foreign_type + '/' + this.selectedDocumento.documenti_key + '/';
    window.open(url, '_system');
  }

  public downloadFile(file?, alertCtrl?) {
    file = this.file;

    const url: string = this.d_url + this.selectedDocumento.doc_foreign_type + '/' + this.selectedDocumento.documenti_key + '/';

    const name: string = this.selectedDocumento.ultima_rev.doc_file;

    alertCtrl = this.alertCtrl;

    const alert = alertCtrl.create({
      title: 'Download in corso...',
      subTitle: name + ' in scaricamento dal server.',
      buttons: ['Attendere prego']
    });
    alert.present();

    // REQUEST CREATION
    const oReq = new XMLHttpRequest();

    // SENDING REQUEST
    oReq.open('GET', url, true);
    oReq.responseType = 'blob'; // blob pls

    // IF DATA RECEIVED THEN  WRITE FILE
    // tslint:disable-next-line:only-arrow-functions
    oReq.onload = function(oEvent) {

      alert.dismiss();

      const a_ok = alertCtrl.create({
        title: 'Download effettuato',
        subTitle: name + ' è stato scaricato nella cartella download.',
        buttons: ['OK']
      });
      // SAVE TEMP FILE IN APP FOLDER
      if (file.externalRootDirectory != null) {
        file.writeFile(file.externalRootDirectory + 'download/', name, oReq.response, { replace: true }).then(data => {
          console.log('File scritto');
          a_ok.present();
        }
        ).catch(err =>
          console.log('Errore in scrittura')
        );
      }
      if (file.documentsDirectory != null) {
        file.writeFile(file.documentsDirectory, name, oReq.response, { replace: true }).then(data => {
          console.log('File scritto');
          a_ok.present();
        }
        ).catch(err =>
          console.log('Errore in scrittura')
        );
      }
    };

    oReq.send(); // this is useless right?

  }
}
