import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { PrescrizioniService } from '../../../services/prescrizioni/prescrizioni.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'page-dashboard-prescrizione',
  templateUrl: './dashboard-prescrizione.page.html',
  styleUrls: ['./dashboard-prescrizione.page.scss'],

})

export class DashboardPrescrizionePage extends BaseComponent {
  selectedPrescrizione: Comunicazione.Prescrizione;
  comunicazioneTitolo: string;
  whichPage: string;

  public showMap: boolean;
  public d_url:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public prescrizioniService: PrescrizioniService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private file: File,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

    this.route.queryParams.subscribe(params => {
      const p_prescrizione = params['prescrizione'];
      if (p_prescrizione && p_prescrizione !== ''){
        this.selectedPrescrizione = JSON.parse(p_prescrizione) as Comunicazione.Prescrizione;
        //console.log(p_procedimento);
      }
      const p_com = params['com'];
      if (p_com && p_com !== ''){
        this.comunicazioneTitolo = JSON.parse(p_com);
      }
    });
    //this.selectedPrescrizione = navParams.get('prescrizione');
    //this.comunicazioneTitolo = navParams.get('com');
  }

  async ionViewDidEnter() {

    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.d_url = this.storeService.getLocalServerUrl() + "/app/services/get_file/" + tokenValue + "/prescrizione_file/";
      console.log(tokenValue);
      this.whichPage = 'Prescrizione';
      this.prescrizioniService.getPrescrizione(this.storeService.getLocalServerUrl(), this.selectedPrescrizione.prescrizione_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad getPrescrizione');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedPrescrizione = r.prescrizione;
        }
        loading.dismiss();
      })
    });
  }

  segmentPrescrizioneClicked(event) {
    console.log('segmentPrescrizioneClicked');
  }

  segmentAttivitaClicked(event) {
    console.log('segmentAttivitaClicked ');
  }

  segmentAllegatiClicked(event) {
    console.log('segmentAllegatiClicked');
  }

  segmentProrogheClicked(event) {
    console.log('segmentProrogheClicked');
  }

  public downloadFileLink(f:Comunicazione.FilePre) {
    var url:string = this.d_url + f.prescrizione_file_key + "/";
    window.open(url, '_system');
  }

  public async downloadFile(f:Comunicazione.FilePre, file?, alertCtrl?) {
    file = this.file;

    var url:string = this.d_url + f.prescrizione_file_key + "/";
    var name:string = f.prf_file;

    alertCtrl = this.alertCtrl;

    let alert = await alertCtrl.create({
        header: 'Download in corso...',
        subHeader: name + " in scaricamento dal server.",
        buttons: ['Attendere prego']
    });
    (await alert).present();

    //REQUEST CREATION 
    let oReq = new XMLHttpRequest();

    //SENDING REQUEST
    oReq.open("GET", url, true);
    oReq.responseType = "blob"; // blob pls

    //IF DATA RECEIVED THEN  WRITE FILE
    oReq.onload = async function(oEvent) {

      alert.dismiss();

      let a_ok = await alertCtrl.create({
        header: 'Download effettuato',
        subHeader: name + " è stato scaricato nella cartella download.",
        buttons: ['OK']
      });
      let i_ok = await alertCtrl.create({
        header: 'Download effettuato',
        subHeader: name + " è stato scaricato nella cartella file-gisco.",
        buttons: ['OK']
      });
      //SAVE TEMP FILE IN APP FOLDER
      if (file.externalRootDirectory != null)
      {
        file.writeFile(file.externalRootDirectory+ 'download/', name, oReq.response, { replace: true }).then(async data =>
          {
            console.log('File scritto');
            (await a_ok).present();
          }
          ).catch(err =>
            console.log('Errore in scrittura')
          );
      }
      if (file.documentsDirectory != null)
      {
        file.writeFile(file.documentsDirectory, name, oReq.response, { replace: true }).then(async data =>
          {
            console.log('File scritto');
            (await i_ok).present();
          }
          ).catch(err =>
            console.log('Errore in scrittura')
          );
      }
    };

    oReq.send();//this is useless right?

  }

}

