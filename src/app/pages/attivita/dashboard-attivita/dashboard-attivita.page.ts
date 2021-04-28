import { NavController, NavParams, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';

import { Component, NgZone } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { SitiService } from '../../../services/siti/siti.service';
import { DispositiviService } from '../../../services/dispositivi/dispositivi.service';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Attivita } from '../../../models/attivita/attivita.namespace';
import { AttivitaService } from '../../../services/attivita/attivita.service';
import { DatePipe } from '@angular/common';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'dashboard-attivita',
  templateUrl: './dashboard-attivita.page.html',
  styleUrls: ['./dashboard-attivita.page.scss'],
})

export class DashboardAttivitaPage extends BaseComponent {
  public selectedAttivita: Attivita.Attivita;
  color: string;
  icon: string;
  private ws_Att_Ch: Attivita.ws_Attivita_Chiusura;
  public listaCommenti: Array<Osservazione.Commento>;
  public listaAssegnazioni: Array<Attivita.Assegnazione>;
  public dataInizio: string;
  public note: string;
  public dataFine: string;
  public conclusa: boolean;
  public whichPage: string;
  public commentoTesto: string;
  public rispostaTesto: string;
  public myUserKey: number;
  selectedIndexCommento: any;
  selectedCommento: any;
  public listaPersonalizzate: Array<Osservazione.ProprietaPersonalizzataChiusura>;
  private valoreSKey: number;
  public listaImmagini: Array<Attivita.Immagine>;
  private ws_Oss_Com: Osservazione.ws_Commento;
  public label_data:string;
  public value_data:string;

  constructor(public navCtrl: NavController,
    public attivitaService: AttivitaService,
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

    this.ws_Att_Ch = new Attivita.ws_Attivita_Chiusura();
    this.whichPage = 'Attivita';
    this.commentoTesto = "";
    this.rispostaTesto = "";
    
    this.route.queryParams.subscribe(params => {
      const p_selectedAttivita = params['selectedAttivita'];
      if (p_selectedAttivita && p_selectedAttivita !== ''){
        this.selectedAttivita = JSON.parse(p_selectedAttivita) as Attivita.Attivita;
      }
    });
    //this.selectedAttivita = this.navParams.get("selectedAttivita")
    this.listaPersonalizzate = new Array<Osservazione.ProprietaPersonalizzataChiusura>();

    this.dataInizio = this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
    this.dataFine = this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
  }

  async ionViewDidEnter() {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    console.log("this.ws_Oss.attivita " + this.selectedAttivita.att_conclusa);
    this.conclusa = this.selectedAttivita.att_conclusa === 'S';

    this.label_data = "Data scadenza";
    this.value_data = this.selectedAttivita.att_data_scadenza;
    if (this.selectedAttivita.att_data_scadenza.includes("0001")){
      this.label_data = "Data termine";
      this.value_data = this.selectedAttivita.att_data_fine_prev;
      }

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.myUserKey = val.token_dipendente_key;
      console.log("setViewAttivita");

      this.attivitaService.getAttivita(this.storeService.getLocalServerUrl(), this.selectedAttivita.attivita_key, tokenValue).subscribe(r => {
        console.log('ionViewDidLoad DashboardAttivitaPage getAttivita');
        if (r.ErrorMessage.msg_code === 0) {
            this.listaAssegnazioni = r.c_assegnazioni;

            this.attivitaService.getCommentiAttivita(this.storeService.getLocalServerUrl(), tokenValue, this.selectedAttivita.attivita_key).subscribe(r => {
              if (r.ErrorMessage.msg_code === 0) {
                this.listaCommenti = r.l_lista_commenti;
                //console.log(this.listaCommenti);
      
                //  if (this.conclusa) {
                this.attivitaService.getAttivitaChiusura(this.storeService.getLocalServerUrl(), this.selectedAttivita.attivita_key, tokenValue).subscribe(r => {
                  if (r.ErrorMessage.msg_code === 0) {
                    this.selectedAttivita = r.attivita;
                    if (this.conclusa) {
                      this.dataInizio = r.att_data_inizio_effettiva;
                      this.dataFine = r.att_data_fine_effettiva;
                    }
                    this.note = r.att_descrizione;
      
                    this.listaPersonalizzate = r.c_proprieta_personalizzate;
      
                    //console.log("getListaImmaginiAttivita");
      
                    this.attivitaService.getListaImmaginiAttivita(this.storeService.getLocalServerUrl(), this.selectedAttivita.attivita_key, tokenValue).subscribe(r => {
                      if (r.ErrorMessage.msg_code === 0) {
                        this.listaImmagini = r.l_lista_immagini;
                        console.log(this.listaImmagini);
                      }
                      loading.dismiss();
                    })
                  } else {
                    loading.dismiss();
                    this.presentAlert("", "errore recupero attivita Chiusura");
                  }
                });
                /* } else {
                   loading.dismiss();
                 }*/
              } else {
                loading.dismiss();
                this.presentAlert("", "errore recupero Commenti attivita");
              }
      
            });
      
          } else {
            loading.dismiss();
            this.presentAlert("", "errore recupero Attivita");
        }
      })

    });

    console.log("this.conclusa " + this.conclusa);

  }

  // back() {
  //   if (this.callbackChiusa != undefined && this.conclusa != undefined && this.conclusa) {
  //     console.log("back " + this.selectedAttivita.attivita_key);

  //     this.callbackChiusa(this.selectedAttivita.attivita_key).then(() => {
  //       this.navCtrl.pop();
  //     });
  //   } else {
  //     this.navCtrl.pop();
  //   }
  // }

  async presentAlertChiudiAttivita() {
    const alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Sicuro che vuoi chiudere questa attività?',
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
            this.chiudiAttivita();
          }
        }
      ]
    });

    await alert.present();
  }

  public async chiudiAttivita() {
    console.log("chiudiAttivita");
    this.ws_Att_Ch.attivita = this.selectedAttivita;
    //console.log("note " + this.note);
    var verificato:boolean = true;
    if (this.dataInizio == undefined || this.dataInizio == '') {
      this.presentAlert("", "la data inizio è obbligatoria");
    }
    if (this.dataFine == undefined || this.dataFine == '') {
      verificato=false;
      this.presentAlert("", "la data fine è obbligatoria");
    }
    if (this.note == undefined || this.note == '') {
      verificato=false;
      this.presentAlert("", "Inserire le note di chiusura");
    }
    if (!moment(this.dataInizio).isSameOrBefore(moment(this.dataFine))) {
      this.presentAlert("", "deve essere this.dataInizio < this.dataFine");
      verificato=false;
    }

    if (verificato) {
      this.ws_Att_Ch.attivita.att_data_inizio_effettiva = this.dataInizio;
      this.ws_Att_Ch.att_data_inizio_effettiva = this.dataInizio;
      this.ws_Att_Ch.attivita.att_data_fine_effettiva = this.dataFine;
      this.ws_Att_Ch.att_data_fine_effettiva = this.dataFine;
      console.log("dataInizio " + this.dataInizio);
      console.log("dataFine " + this.dataFine);
      console.log(moment(this.dataInizio, "DD-MM-YYYY HH:mm"));

      this.ws_Att_Ch.attivita.att_conclusa = "S";
      this.ws_Att_Ch.att_descrizione = this.note;
      this.ws_Att_Ch.c_proprieta_personalizzate = this.listaPersonalizzate;
      let loading = await this.loadingCtrl.create({
        message: 'Caricamento...'
      });
      loading.present();
      console.log("this.ws_Oss.osservazione " + this.selectedAttivita.att_conclusa);
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        var tokenValue = val.token_value;
        this.ws_Att_Ch.token = tokenValue;
        console.log("this.ws_Att_Ch " + JSON.stringify(this.ws_Att_Ch));
        this.attivitaService.salvaChiusuraAttivita(this.storeService.getLocalServerUrl(), this.ws_Att_Ch).subscribe(r => {

          if (r.ErrorMessage.msg_code === 0) {
            this.conclusa = true;
            loading.dismiss();
            this.presentAlert("", "attività chiusa correttamente");
          } else {
            loading.dismiss();
            this.presentAlert("", r.ErrorMessage.msg_testo);
          }
        }, err => {
          this.presentAlert("", err.statusText);
          loading.dismiss();
        })
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });

    }
  }

  segmentAttivitaClicked(event) {
    console.log('segmentAttivitaClicked');
  }

  segmentCommentiClicked(event) {
    console.log('segmentCommentiClicked');

  }

  segmentAssegnazioniClicked(event) {
    console.log('segmentAssegnazioniClicked');
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
      this.ws_Oss_Com.commento.com_foreign_key = this.selectedAttivita.attivita_key;
      this.ws_Oss_Com.commento.c_commenti = new Array<any>();
      this.ws_Oss_Com.commento.com_sito_key = this.selectedAttivita.att_azienda_key;
      let loading = await this.loadingCtrl.create({
        message: 'Caricamento...'
      });
      loading.present();
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        var tokenValue = val.token_value;
        this.ws_Oss_Com.token = tokenValue;
        this.ws_Oss_Com.commento.dipendenti.dipendenti_key = val.token_dipendente_key;
        this.ws_Oss_Com.commento.com_dipendente_key = val.token_dipendente_key;
        console.log("pippo" + JSON.stringify(this.ws_Oss_Com));
        this.attivitaService.salvaCommentoAttivita(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(r => {
          if (r.ErrorMessage.msg_code === 0) {
            console.log(r)
            this.ws_Oss_Com.commento.commenti_key = r.result_key;
            this.listaCommenti.push(this.ws_Oss_Com.commento);
            this.commentoTesto = "";
          } else {
            this.presentAlert("", r.ErrorMessage.msg_testo);
          }
          loading.dismiss();
        }, err => {
          this.presentAlert("", err.statusText);
          loading.dismiss();
        })
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });
    } else {
      this.presentAlert("", "inserire un commento");
    }
  }

  async eliminaCommento(c: Osservazione.Commento, commenti: Array<Osservazione.Commento>) {
    let alert = await this.alertCtrl.create({
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
    alert.present();
  }

  async delete(c: Osservazione.Commento, commenti: Array<Osservazione.Commento>) {
    console.log("eliminaCommento");
    this.ws_Oss_Com = new Osservazione.ws_Commento();
    this.ws_Oss_Com.commento = c;
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.ws_Oss_Com.token = tokenValue;
      this.attivitaService.cancellaCommentoAttivita(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(r => {
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
        loading.dismiss();
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      })
    }, err => {
      this.presentAlert("", err.statusText);
      loading.dismiss();
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
      this.ws_Oss_Com.commento.com_foreign_key = this.selectedAttivita.attivita_key;
      this.ws_Oss_Com.commento.c_commenti = new Array<any>();
      this.ws_Oss_Com.commento.com_sito_key = this.selectedAttivita.att_azienda_key;
      this.ws_Oss_Com.commento.com_commento_key = c.commenti_key;
      let loading = await this.loadingCtrl.create({
        message: 'Caricamento...'
      });
      loading.present();
      this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
        var tokenValue = val.token_value;
        this.ws_Oss_Com.token = tokenValue;
        this.ws_Oss_Com.commento.dipendenti.dipendenti_key = val.token_dipendente_key;
        this.ws_Oss_Com.commento.com_dipendente_key = val.token_dipendente_key;
        this.attivitaService.salvaCommentoAttivita(this.storeService.getLocalServerUrl(), this.ws_Oss_Com).subscribe(r => {
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
          loading.dismiss();
          console.log("pippo")
        }, err => {
          this.presentAlert("", err.statusText);
          loading.dismiss();
        })
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });
    } else {
      this.presentAlert("", "inserire un commento");
    }
  }

  chiudiCommento() {
    this.selectedIndexCommento = -1;
  }

  async presentAlert(title: string, mess: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    alert.present();
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

      console.log("c_valori " + JSON.stringify(p.c_valori));
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
    //console.log("key " + key);
    //console.log('event : ' + $event.value);
    if ($event.value == true) {
      p.c_valori[0].tam_selected = "S"
      p.c_valori[1].tam_selected = "N"
    } else {
      p.c_valori[1].tam_selected = "S"
      p.c_valori[0].tam_selected = "N"
    }
    //console.log("c_valori " + JSON.stringify(p.c_valori));
  }

  async presentImmagineActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Modifica immagine',
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
    actionSheet.present();
  }


  async addImmagine(mode) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
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
        ws_imm.oggetto_key = this.selectedAttivita.attivita_key;
        ws_imm.tipologia = "attivita";
        ws_imm.immagine = imageData;

        console.log("image put" + JSON.stringify(ws_imm));
        this.attivitaService.salvaImmagineAttivita(this.storeService.getLocalServerUrl(), ws_imm).subscribe((r) => {
          console.log(r);
          if (r.ErrorMessage.msg_code == 0) {
            this.presentAlert("", "immagine è stata salvata correttamente");
            this.attivitaService.getListaImmaginiAttivita(this.storeService.getLocalServerUrl(), this.selectedAttivita.attivita_key, val.token_value).subscribe(imm => {
              if (imm.ErrorMessage.msg_code == 0) {
                this.listaImmagini = imm.l_lista_immagini;
              } else {
                this.presentAlert("ERROR", "si è verificato un problema nel reload delle immagini");
              }
            }, err => {
              this.presentAlert("", err.statusText);
              loading.dismiss();
            });
          } else {
            this.presentAlert("", "errore salvataggio immagine " + r.ErrorMessage.msg_testo);
          }
          loading.dismiss();
        }, err => {
          this.presentAlert("", err.statusText);
          loading.dismiss();
        });
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      })
    }, (err) => {
      loading.dismiss();
      console.log(err);
      console.log("err");
    });

  }

  async presentAlertEliminaImmagine(imm: Attivita.Immagine) {
    const alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Sicuro che vuoi cancellare questa immagine?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.goToEliminaImmagine(imm);
          }
        }
      ]
    });

    await alert.present();
  }

  async goToEliminaImmagine(imm: Attivita.Immagine) {
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    var ws_imm = new Attivita.ws_Immagine();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      ws_imm.token = val.token_value;
      ws_imm.immagine = imm;
      console.log("goToEliminaImmagine " + JSON.stringify(ws_imm));
      this.attivitaService.cancellaImmagineAttivita(this.storeService.getLocalServerUrl(), ws_imm).subscribe((r) => {
        console.log(r);
        if (r.ErrorMessage.msg_code == 0) {
          this.listaImmagini.splice(this.listaImmagini.indexOf(imm), 1);
        } else {
          this.presentAlert("", "errore eliminazione immagine " + r.ErrorMessage.msg_testo);
        }
        loading.dismiss();
      }, err => {
        this.presentAlert("", err.statusText);
        loading.dismiss();
      });
    }, err => {
      this.presentAlert("", err.statusText);
      loading.dismiss();
    })
  }

  openMessage(assegnazione: Attivita.Assegnazione) {
    var mess: Messaggio.Messaggio  
    mess = new Messaggio.Messaggio();
    mess.cognome_des = assegnazione.dp_cognome;
    mess.nome_des = assegnazione.dp_nome;
    mess.destinatario_key = assegnazione.dipendenti_key;
    mess.soggetto = this.selectedAttivita.att_titolo;
    mess.messaggio = '';
    this.goToPageParams('nuovo-messaggio',
      {
        queryParams: { invio: JSON.stringify(mess) }
      });
    //this.navCtrl.push(NuovoMessaggioPage, { invio: mess })
  }

}

