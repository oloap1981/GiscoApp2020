import { Component, NgZone } from '@angular/core';
import { NavParams, NavController, AlertController } from '@ionic/angular';
import { File} from '@ionic-native/file/ngx';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { ComunicazioniService } from '../../../services/comunicazioni/comunicazioni.service';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'page-dashboard-comunicazione',
  templateUrl: './dashboard-comunicazione.page.html',
  styleUrls: ['./dashboard-comunicazione.page.scss'],

})

export class DashboardComunicazionePage extends BaseComponent {

  public selectedComunicazione: Comunicazione.Comunicazione;
  public procedimento: Procedimento.Procedimento;
  public whichPage: string;
  public d_url:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comunicazioniService: ComunicazioniService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private file: File,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

    this.route.queryParams.subscribe(params => {
      const p_comunicazione = params['comunicazione'];
      if (p_comunicazione && p_comunicazione !== ''){
        this.selectedComunicazione = JSON.parse(p_comunicazione) as Comunicazione.Comunicazione;
        //console.log(p_procedimento);
      }
    });

    //this.selectedComunicazione = navParams.get('comunicazione');

    this.procedimento = new Procedimento.Procedimento();
  }

  ionViewDidEnter() {

    console.log('ionViewDidLoad DashboardComunicazionePage');
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.d_url = this.storeService.getLocalServerUrl() + "/app/services/get_file/" + tokenValue + "/comunicazioni_file/";
      //console.log(this.d_url);
      //console.log(tokenValue);
      this.whichPage = 'Comunicazione';
      this.comunicazioniService.getComunicazione(this.storeService.getLocalServerUrl(), this.selectedComunicazione.comunicazioni_key, tokenValue).subscribe(r => {
        //console.log('ionViewDidLoad DashboardComunicazionePage getComunicazione');
        if (r.ErrorMessage.msg_code === 0) {
          this.selectedComunicazione = r.comunicazione;
          this.procedimento = r.procedimento;
        }
      }, err => {
        this.presentAlert("", err.statusText);
      })
    }, err => {
      this.presentAlert("", err.statusText);
    });
  }

  segmentComunicazioneClicked(event) {
  }

  segmentFilesClicked(event) {
    console.log('segmentFilesClicked');
  }

  segmentPrescrizioniClicked(event) {
    console.log('segmentPrescrizioniClicked');
  }

  public goToDetails(event, prescrizione) {
    console.log("goToDetailsPrescrizione click" + prescrizione);

    this.goToPageParams('dashboard-prescrizione',
      {
        queryParams: {
          prescrizione: JSON.stringify(prescrizione),
          com: JSON.stringify(this.selectedComunicazione.com_titolo)
      }
    });
    //this.navCtrl.push(DashboardPrescrizionePage, { prescrizione: prescrizione, com: this.selectedComunicazione.com_titolo })
  }

  hideDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear() === 1;
  }

  public getPreColor(prescrizione: Comunicazione.Prescrizione): string {
    switch (prescrizione.pre_stato) {
      case 'S':
        return 'danger';
      case 'I':
        return 'alert';
      case 'F':
        return 'future';
      case 'D':
        return 'no-date';
      case 'V':
        return 'vincolate';
      default:
        return 'done';
    }

    // <ion-icon name="alert" color="danger" item-start></ion-icon>
    // <ion-icon name="time" color="alert" item-start></ion-icon>
    // <ion-icon name="information-circle" color="future" item-start></ion-icon>
    // <ion-icon name="help-circle" color="no-date" item-start></ion-icon>
    // <ion-icon name="time" color="vincolate" item-start></ion-icon>
    // <ion-icon name="checkmark-circle" color="done" item-start></ion-icon>

  }

  public getPreIcon(prescrizione: Comunicazione.Prescrizione): string {

    switch (prescrizione.pre_stato) {
      case 'S':
        return 'alert-circle';
      case 'I':
        return 'time';
      case 'F':
        return 'information-circle';
      case 'D':
        return 'help-circle';
      case 'V':
        return 'time';
      default:
        return 'checkmark-circle';
    }
  }

  public downloadFileLink(f:Comunicazione.FileCom) {
    var url:string = this.d_url + f.comunicazioni_file_key + "/";
    window.open(url, '_system');
    
  }

  public async downloadFile(f:Comunicazione.FileCom, file?, alertCtrl?) {

    file = this.file;

    let localURLs = [
      this.file.dataDirectory,
      this.file.documentsDirectory,
      this.file.externalApplicationStorageDirectory,
      this.file.externalCacheDirectory,
      this.file.externalRootDirectory,
      this.file.externalDataDirectory,
      this.file.sharedDirectory,
      this.file.syncedDataDirectory,
      this.file.cacheDirectory,
      this.file.tempDirectory
    ];

    //Android
    // ["file:///data/user/0/it.mesys.gisco/files/", 
    // null, 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/", 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/cache/", 
    // "file:///storage/emulated/0/", 
    // "file:///storage/emulated/0/Android/data/it.mesys.gisco/files/", 
    // null, 
    // null]

    //IOS
    // ["file:///var/mobile/Containers/Data/Application/8AE35562-CE48-4F07-9207-2FDCC1F13C72/Library/NoCloud/",
    // "file:///var/mobile/Containers/Data/Application/8AE35562-CE48-4F07-9207-2FDCC1F13C72/Documents/",
    // null,
    // null,
    // null,
    // null,
    // null,
    // "file:///var/mobile/Containers/Data/Application/8AE35562-CE48-4F07-9207-2FDCC1F13C72/Library/Cloud/",
    // "file:///var/mobile/Containers/Data/Application/8AE35562-CE48-4F07-9207-2FDCC1F13C72/Library/Caches/",
    // "file:///private/var/mobile/Containers/Data/Application/8AE35562-CE48-4F07-9207-2FDCC1F13C72/tmp/"]

    //NEL CONFI.XML
    // <config-file parent="UIFileSharingEnabled" platform="ios" target="*-Info.plist">
    //     <true />
    // </config-file>
    // <config-file parent="LSSupportsOpeningDocumentsInPlace" platform="ios" target="*-Info.plist">
    //     <true />
    // </config-file>

    //console.log(localURLs);

    var url:string = this.d_url + f.comunicazioni_file_key + "/";
    var name:string = f.cof_file;

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
      //SAVE FILE IN ANDROID
      if (file.externalRootDirectory != null)
      {
        file.writeFile(file.externalRootDirectory + 'download/', name, oReq.response, { replace: true }).then(async data =>
          {
            console.log('File scritto');
            (await a_ok).present();
          }
          ).catch(err =>
            console.log('Errore in scrittura')
          );
      }

      //SAVE FILE IN IOS
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


  async presentAlert(title: string, mess: string) {
    let alert = this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    (await alert).present();
  }

}

