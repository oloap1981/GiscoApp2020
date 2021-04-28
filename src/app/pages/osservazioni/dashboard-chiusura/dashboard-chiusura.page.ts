import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';

import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { SitiService } from '../../../services/siti/siti.service';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'dashboard-chiusura',
  templateUrl: './dashboard-chiusura.page.html',
  styleUrls: ['./dashboard-chiusura.page.scss'],

})

export class DashboardChiusuraPage extends BaseComponent {
  public osservazione: Osservazione.Osservazione;
  color: string;
  icon: string;
  //private callbackChiusa: any;
  private ws_Oss_Ch: Osservazione.ws_Osservazione_Chiusura;
  private ws_Oss_Com: Osservazione.ws_Commento;
  public listaCommenti: Array<Osservazione.Commento>;
  public dataInizio: string;
  public note: string;
  public dataFine: string;
  public conclusa: boolean;
  public whichPage: string;
  public commentoTesto: string;
  private rispostaTesto: string;
  public myUserKey: number;
  selectedIndexCommento: any;
  selectedCommento: any;
  private listaPersonalizzate: Array<Osservazione.ProprietaPersonalizzataChiusura>;
  private valoreSKey: number;
  private listaImmagini: Array<Osservazione.Immagine>;

  public customPickerOptions: any;

  constructor(public navCtrl: NavController,
    public osservazioniService: OsservazioniService,
    public sitiService: SitiService,
    public dispositiviService: DispositiviService,
    private storeService: StoreService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
      
    this.ws_Oss_Ch = new Osservazione.ws_Osservazione_Chiusura();
    this.whichPage = 'Osservazione';
    this.commentoTesto = "";
    this.rispostaTesto = "";
    this.listaPersonalizzate = new Array<Osservazione.ProprietaPersonalizzataChiusura>();

    this.dataInizio = this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
    this.dataFine = this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');

    this.customPickerOptions = {
      buttons: [{
        text: 'Ok'
      }, {
        text: 'Chiudi',
        handler: () => {
          return false;
        }
      }]
    }
  }

  async ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      message: 'Caricamento...'
    });

    //this.osservazione = this.navParams.get("osservazione")
    //this.callbackChiusa = this.navParams.get("callbackChiusa")

    this.route.queryParams.subscribe(params => {
      const p_osservazione = params['osservazione'];
      if (p_osservazione && p_osservazione !== '') {
        this.osservazione = JSON.parse(p_osservazione) as Osservazione.Osservazione;
      }

    });

    (await loading).present();
    console.log("this.ws_Oss.osservazione " + this.osservazione.att_conclusa);
    this.conclusa = this.osservazione.att_conclusa === 'S';
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.myUserKey = val.token_dipendente_key;
      console.log("setViewOsservazione");
      this.osservazioniService.getCommentiOsservazione(this.storeService.getLocalServerUrl(), tokenValue, this.osservazione.attivita_key).subscribe(async r => {
        if (r.ErrorMessage.msg_code === 0) {
          this.listaCommenti = r.l_lista_commenti;
          // console.log("this.listaCommenti " + JSON.stringify(this.listaCommenti));
          //  if (this.conclusa) {
          this.osservazioniService.getOsservazioneChiusura(this.storeService.getLocalServerUrl(), this.osservazione.attivita_key, tokenValue).subscribe(async r => {
            if (r.ErrorMessage.msg_code === 0) {
              this.osservazione = r.osservazione;
              if (this.conclusa) {
                this.dataInizio = r.att_data_inizio_effettiva;
                this.dataFine = r.att_data_fine_effettiva;
              }
              // this.dataInizio = r.att_data_inizio_effettiva;
              // this.dataFine = r.att_data_fine_effettiva;
              this.note = r.att_descrizione;
              this.listaPersonalizzate = r.c_proprieta_personalizzate;
              this.osservazioniService.getListaImmaginiOsservazione(this.storeService.getLocalServerUrl(), this.osservazione.attivita_key, tokenValue).subscribe(async r => {
                if (r.ErrorMessage.msg_code === 0) {
                  this.listaImmagini = r.l_lista_immagini;
                }
                (await loading).dismiss();
              })
            } else {
              (await loading).dismiss();
              this.presentAlert("", "errore recupero Osservazione Chiusura");
            }
          });
          /* } else {
             loading.dismiss();
           }*/
        } else {
          (await loading).dismiss();
          this.presentAlert("", "errore recupero Commenti Osservazione");
        }

      });
    });

    console.log("this.conclusa " + this.conclusa);

  }

  // back() {
  //   if (this.callbackChiusa != undefined && this.conclusa != undefined) {
  //     this.callbackChiusa(this.conclusa).then(() => {
  //       this.navCtrl.pop();
  //     });
  //   } else {
  //     this.navCtrl.pop();
  //   }
  // }

  async presentAlertChiudiOsservazione() {
    const alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Sicuro che vuoi chiudere questa osservazione?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (ko) => {
            console.log('Confirm Cancel: ko');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.chiudiOsservazione();
          }
        }
      ]
    });

    await alert.present();
  }

  public async chiudiOsservazione() {
    console.log("chiudiOsservazione");
    this.ws_Oss_Ch.osservazione = this.osservazione;
    console.log("note " + this.note);
    if (this.dataInizio != undefined) {
      this.ws_Oss_Ch.osservazione.att_data_inizio_effettiva = this.dataInizio;
      this.ws_Oss_Ch.att_data_inizio_effettiva = this.dataInizio;
      if (this.dataFine != undefined) {
        this.ws_Oss_Ch.osservazione.att_data_fine_effettiva = this.dataFine;
        this.ws_Oss_Ch.att_data_fine_effettiva = this.dataFine;
        console.log("dataInizio " + this.dataInizio);
        console.log("dataFine " + this.dataFine);
        console.log(moment(this.dataInizio, "DD-MM-YYYY HH:mm"));
        console.log("this.ws_Oss.osservazione " + JSON.stringify(this.ws_Oss_Ch));

        if (moment(this.dataInizio).isSameOrBefore(moment(this.dataFine))) {
          this.ws_Oss_Ch.osservazione.att_conclusa = "S";
          this.ws_Oss_Ch.att_descrizione = this.note;
          this.ws_Oss_Ch.c_proprieta_personalizzate = this.listaPersonalizzate;
          let loading = this.loadingCtrl.create({
            message: 'Caricamento...'
          });
          (await loading).present();
          console.log("this.ws_Oss.osservazione " + this.osservazione.att_conclusa);
          this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
            var tokenValue = val.token_value;
            this.ws_Oss_Ch.token = tokenValue;
            this.osservazioniService.salvaChiusuraOsservazione(this.storeService.getLocalServerUrl(), this.ws_Oss_Ch).subscribe(async r => {
              console.log("this.ws_Oss.osservazione " + JSON.stringify(this.ws_Oss_Ch));

              if (r.ErrorMessage.msg_code === 0) {
                this.conclusa = true;
                (await loading).dismiss();
                this.presentAlert("", "osservazione chiusa correttamente");
              } else {
                (await loading).dismiss();
                this.presentAlert("", r.ErrorMessage.msg_testo);
              }
            })
          });
        } else {
          this.presentAlert("", "deve essere this.dataInizio <= this.dataFine");

        }
      } else {
        this.presentAlert("", "data fine è obbligatoria");
      }
    } else {
      this.presentAlert("", "data inizio è obbligatoria");
    }
  }

  segmentOsservazioneClicked(event) {
    console.log('segmentOsservazioneClicked');
  }

  segmentCommentiClicked(event) {
    console.log('segmentCommentiClicked');

  }

  async salvaCommento() {
    console.log("salvaCommento");
    this.ws_Oss_Com = new Osservazione.ws_Commento();
    if (this.commentoTesto.trim() != "") {
      this.ws_Oss_Com.commento = new Osservazione.Commento();
      this.ws_Oss_Com.commento.dipendenti = new Osservazione.Dipendenti();
      // this.ws_Oss_Com.commento.com_data = new Date().getTime().toString();
      this.ws_Oss_Com.commento.com_data = new Date().toISOString();
      this.ws_Oss_Com.commento.com_descrizione = this.commentoTesto;
      this.ws_Oss_Com.commento.com_foreign_key = this.osservazione.attivita_key;
      this.ws_Oss_Com.commento.c_commenti = new Array<any>();
      this.ws_Oss_Com.commento.com_sito_key = this.osservazione.att_azienda_key;
      let loading = this.loadingCtrl.create({
        message: 'Caricamento...'
      });
      (await loading).present();
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        var tokenValue = val.token_value;
        this.ws_Oss_Com.token = tokenValue;
        this.ws_Oss_Com.commento.dipendenti.dipendenti_key = val.token_dipendente_key;
        this.ws_Oss_Com.commento.com_dipendente_key = val.token_dipendente_key;
        console.log("pippo" + JSON.stringify(this.ws_Oss_Com));
        this.osservazioniService.salvaCommentoOsservazione(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(async r => {
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r)
            this.ws_Oss_Com.commento.commenti_key = r.result_key;
            this.listaCommenti.push(this.ws_Oss_Com.commento);
            this.commentoTesto = "";
          } else {
            this.presentAlert("", r.ErrorMessage.msg_testo);
          }
          (await loading).dismiss();
        })
      });
    } else {
      this.presentAlert("", "inserire un commento");
    }
  }

  async eliminaCommento(c: Osservazione.Commento, commenti: Array<Osservazione.Commento>) {
    let alert = this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Eliminare definitivamente il commento?',
      buttons: [
        {
          text: 'indietro',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'ok',
          handler: () => {
            this.delete(c, commenti);
          }
        }
      ]
    });
    (await alert).present();
  }

  async delete(c: Osservazione.Commento, commenti: Array<Osservazione.Commento>) {
    console.log("eliminaCommento");
    this.ws_Oss_Com = new Osservazione.ws_Commento();
    this.ws_Oss_Com.commento = c;
    let loading = this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    (await loading).present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.ws_Oss_Com.token = tokenValue;
      this.osservazioniService.cancellaCommentoOsservazione(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(async r => {
        if (r.ErrorMessage.msg_code === 0) {
          if (commenti == undefined) {
            this.listaCommenti.splice(this.listaCommenti.indexOf(c), 1);
          } else {
            commenti.splice(commenti.indexOf(c), 1);
          }
          console.log(r)
        } else {
          this.presentAlert("", r.ErrorMessage.msg_testo);
        }
        (await loading).dismiss();
      })
    });

  }

  rispondiCommento(index) {
    console.log("espendiFase click");
    this.commentoTesto = "";
    this.rispostaTesto = "";
    if (this.selectedIndexCommento == index && this.selectedIndexCommento != -1) {
      this.selectedIndexCommento = -1;
    } else
      this.selectedIndexCommento = index;
  }

  async inviaRispostaCommento(c: Osservazione.Commento) {
    console.log("inviaRispostaCommento");
    this.ws_Oss_Com = new Osservazione.ws_Commento();
    if (this.rispostaTesto.trim() != "") {
      this.ws_Oss_Com.commento = new Osservazione.Commento();
      this.ws_Oss_Com.commento.dipendenti = new Osservazione.Dipendenti();
      // this.ws_Oss_Com.commento.com_data = new Date().getTime().toString();
      this.ws_Oss_Com.commento.com_data = new Date().toISOString();
      this.ws_Oss_Com.commento.com_descrizione = this.rispostaTesto;
      this.ws_Oss_Com.commento.com_foreign_key = this.osservazione.attivita_key;
      this.ws_Oss_Com.commento.c_commenti = new Array<any>();
      this.ws_Oss_Com.commento.com_sito_key = this.osservazione.att_azienda_key;
      this.ws_Oss_Com.commento.com_commento_key = c.commenti_key;
      let loading = this.loadingCtrl.create({
        message: 'Caricamento...'
      });
      (await loading).present();
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        var tokenValue = val.token_value;
        this.ws_Oss_Com.token = tokenValue;
        this.ws_Oss_Com.commento.dipendenti.dipendenti_key = val.token_dipendente_key;
        this.ws_Oss_Com.commento.com_dipendente_key = val.token_dipendente_key;
        this.osservazioniService.salvaCommentoOsservazione(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(async r => {
          console.log("pippo  fgd")
          if (r.ErrorMessage.msg_code === 0) {
            this.ws_Oss_Com.commento.commenti_key = r.result_key;
            c.c_commenti.push(this.ws_Oss_Com.commento);
            this.rispondiCommento(-1);
            console.log(r)
          } else {
            this.presentAlert("", r.ErrorMessage.msg_testo);
          }
          console.log("pippo")
          ;(await loading).dismiss();
          console.log("pippo")
        })
      });
    } else {
      this.presentAlert("", "inserire un commento");
    }
  }

  chiudiCommento() {
    this.selectedIndexCommento = -1;
  }

  async presentAlert(title: string, mess: string) {
    let alert = this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    (await alert).present();
  }

  segmentImmaginiClicked(event) {
    console.log('segmentImmaginiClicked');
  }

  valoreSChanged(event: any, c_valori: Array<Osservazione.ValoreChiusura>, cValoriKey: number) {
    console.log("valoreSKey " + this.valoreSKey);
    console.log("cValoriKey " + cValoriKey);
    console.log("event " + event);
    for (var i = 0; i < c_valori.length; i++) {
      console.log("for valoreSKey " + c_valori[i].tipo_attivita_modulo_proprieta_valori_key);
      if (c_valori[i].tipo_attivita_modulo_proprieta_key == cValoriKey) {
        if (c_valori[i].tipo_attivita_modulo_proprieta_valori_key == this.valoreSKey)
          c_valori[i].tam_selected = "S";
        else
          c_valori[i].tam_selected = "N";
      }
    }
  }

  valoreMChanged(valori_key, proprieta_key) {
    console.log("valori_key " + valori_key);
    console.log("proprieta_key " + proprieta_key);
    var p = this.listaPersonalizzate.find(item => item.tipo_attivita_modulo_proprieta_key == proprieta_key)
    var v = p.c_valori.find(val => val.tipo_attivita_modulo_proprieta_valori_key == valori_key)
    if (v.tam_selected == "S")
      v.tam_selected = "N";
    else
      v.tam_selected = "S";
  }

  valoreTChanged(event: any, key: number) {
    console.log("key " + key);
    console.log("event " + event.value);
    var p = this.listaPersonalizzate.find(item => item.tipo_attivita_modulo_proprieta_key == key)
    console.log("key " + p.tam_proprieta);
    p.attivita_modulo_valori.tac_valore_t = event.value;
  }

  valoreDChanged($event, key: number) {
    var p = this.listaPersonalizzate.find(item => item.tipo_attivita_modulo_proprieta_key == key)
    console.log("key " + p.tam_proprieta);
    p.attivita_modulo_valori.tac_valore_d = $event.year + "-" + $event.month + "-" + $event.day + "T00:00:00"
  }

  valoreNChanged(event, key: number) {
    var p = this.listaPersonalizzate.find(item => item.tipo_attivita_modulo_proprieta_key == key)
    console.log("key " + p.tam_proprieta);
    p.attivita_modulo_valori.tac_valore_n = event.value;
  }

  valoreOChanged($event, key: number) {
    var p = this.listaPersonalizzate.find(item => item.tipo_attivita_modulo_proprieta_key == key)
    console.log("key " + key);
    console.log('event : ' + $event.value);
    if ($event == true) {
      p.c_valori[0].tam_selected = "S"
      p.c_valori[1].tam_selected = "N"
    } else {
      p.c_valori[1].tam_selected = "S"
      p.c_valori[0].tam_selected = "N"
    }
  }

  async presentImmagineActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      header: 'Modifica avatar',
      buttons: [
        {
          text: 'Galleria',
          handler: () => {
            this.addImmagine("gallery");
          }
        },
        {
          text: 'Fotocamera',
          handler: () => {
            this.addImmagine("camera");
          }
        },
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await actionSheet).present();
  }


  async addImmagine(mode) {
    let loading = this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    (await loading).present();
    let options: CameraOptions;
    if (mode === "camera") {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
    } else {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('ionViewDidLoad DashboardOsservazionePage');
      var ws_imm = new Osservazione.ws_SendImage();
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        ws_imm.token = val.token_value;
        ws_imm.oggetto_key = this.osservazione.attivita_key;
        ws_imm.tipologia = "attivita";
        ws_imm.immagine = imageData;

        console.log("image put" + JSON.stringify(ws_imm));
        this.osservazioniService.salvaImmagineOsservazione(this.storeService.getLocalServerUrl(), ws_imm).subscribe(async (r) => {
          console.log(r);
          if (r.ErrorMessage.msg_code == 0) {
            this.presentAlert("", "immagine è stata salvata correttamente")
          } else {
            this.presentAlert("", "errore salvataggio immagine " + r.ErrorMessage.msg_testo);
          }
          (await loading).dismiss();
        });
      })
    }, async (err) => {
      (await loading).dismiss();
      console.log(err);
      console.log("err");
    });

  }

  async goToEliminaImmagine(imm: Osservazione.Immagine) {
    let loading = this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    (await loading).present();
    var ws_imm = new Osservazione.ws_Immagine();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      ws_imm.token = val.token_value;
      ws_imm.immagine = imm;
      console.log("goToEliminaImmagine " + JSON.stringify(ws_imm));
      this.osservazioniService.cancellaImmagineOsservazione(this.storeService.getLocalServerUrl(), ws_imm).subscribe(async (r) => {
        console.log(r);
        if (r.ErrorMessage.msg_code == 0) {
          this.listaImmagini.splice(this.listaImmagini.indexOf(imm), 1);
        } else {
          this.presentAlert("", "errore eliminazione immagine " + r.ErrorMessage.msg_testo);
        }
        (await loading).dismiss();
      });
    })
  }



}



