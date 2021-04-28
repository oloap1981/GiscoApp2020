import { NavController, NavParams, AlertController } from '@ionic/angular';

import { Component, NgZone } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { Dipendente } from '../../../models/dipendente/dipendente.namespace';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ProfiloService } from '../../../services/profilo/profilo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';



@Component({
  selector: 'nuovo-messaggio',
  templateUrl: './nuovo-messaggio.page.html',
  styleUrls: ['./nuovo-messaggio.page.scss'],

})

export class NuovoMessaggioPage extends BaseComponent {
  public listaDestinatari: Array<Dipendente.Dipendente>;
  public oggetto = '';
  public messaggio = '';
  public destinatarioSelezionato: Dipendente.Dipendente;
  public conoscenzeSelezionate: Array<Dipendente.Dipendente>;

  public rispondi: boolean;
  public invio: boolean;

  private mess: Messaggio.Messaggio;
  color: string;
  icon: string;
  constructor(public navCtrl: NavController,
    public messaggiService: MessaggiService,
    public profiloService: ProfiloService,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.rispondi = false;
    this.invio = false;
  }

  ionViewDidEnter() {

    let msg_reply = null;
    let msg_inoltro = null;
    let msg_invio = null;
    this.route.queryParams.subscribe(params => {
      const p_reply = params['reply'];
      if (p_reply && p_reply !== ''){
        msg_reply = JSON.parse(p_reply) as Messaggio.Messaggio;
      }
      const p_inoltro = params['inoltro'];
      if (p_inoltro && p_inoltro !== ''){
        msg_inoltro = JSON.parse(p_inoltro) as Messaggio.Messaggio;
      }
      const p_invio = params['invio'];
      if (p_invio && p_invio !== ''){
        msg_invio = JSON.parse(p_invio) as Messaggio.Messaggio;
      }

      
    });

    if (msg_reply != null) {
      this.rispondi = true;
      this.mess = msg_reply;
      this.oggetto = "risposta : " + this.mess.soggetto;
      this.messaggio = "-----------------\n" + this.mess.messaggio + "\n-------------------\n";
      //ricerca destinatario
    }
    else if (msg_inoltro != null) {
      this.mess = msg_inoltro;
      this.oggetto = this.mess.soggetto;
      this.messaggio = this.mess.messaggio;
    }
    else if (msg_invio != null) {
      this.invio = true;
      this.mess = msg_invio;
      this.oggetto = this.mess.soggetto;
      this.messaggio = this.mess.messaggio;
    }
    else this.mess = new Messaggio.Messaggio();
    
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getDipendentiAttivi(this.storeService.getLocalServerUrl(), tokenValue).subscribe(r => {
        this.listaDestinatari = r.l_dipendenti;
        if (this.rispondi) {
          this.destinatarioSelezionato = this.getDestinatarioByKey(msg_reply.mittente_key);
        }
        if (this.invio) {
          this.destinatarioSelezionato = this.getDestinatarioByKey(msg_invio.destinatario_key);
        }
        for (let i = 0; i < this.listaDestinatari.length; i++) {
          this.listaDestinatari[i].nomeCognome = this.listaDestinatari[i].nome + " " + this.listaDestinatari[i].cognome;
        }
      },
        (error) => {
          this.presentAlert("", "errore recupero della risorsa");
        })
    });
  }

  private getDestinatarioByKey(key: number) {
    let destinatario = new Dipendente.Dipendente();
    for (let i = 0; i < this.listaDestinatari.length; i++) {
      if (this.listaDestinatari[i].dipendenti_key === key) {
        destinatario = this.listaDestinatari[i];
      }
    }
    return destinatario;
  }

  filterPorts(ports: Array<Dipendente.Dipendente>, text: string) {
    return ports.filter(port => {
      return port.nome.toLowerCase().indexOf(text) !== -1 ||
        port.cognome.toLowerCase().indexOf(text) !== -1
    });
  }

  destinatarioChange(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    console.log(event.text);
    if (event.text) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();
      console.log(text);
      if (!text || text == "") {
        event.component.items = this.listaDestinatari;
        event.component.endSearch();
        return;
      }
      event.component.items = this.filterPorts(this.listaDestinatari, text);
      event.component.endSearch();
    }
  }

  conoscenzaChange(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    console.log(event.text);
    if (event.text) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();
      console.log(text);
      if (!text || text == "") {
        event.component.items = this.listaDestinatari;
        event.component.endSearch();
        return;
      }
      event.component.items = this.filterPorts(this.listaDestinatari, text);
      event.component.endSearch();
    }
  }
  /* public goToDetails(mess){
     this.navCtrl.push(MessaggiDetailsPage, {mess : mess});
   }*/

  back() {
    this.navCtrl.pop();
  }

  public inviaMessaggio() {

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      let mittente: Dipendente.Dipendente;
      var tokenValue = val.token_value;
      if (this.destinatarioSelezionato != null) {
        this.profiloService.getProfilo(this.storeService.getLocalServerUrl(), val.token_dipendente_key, tokenValue).subscribe(r => {
          console.log('ionViewDidLoad DashboardProfiloPage getProfilo');
          if (r.ErrorMessage.msg_code === 0) {
            mittente = r.dipendente;
            console.log("this.profilo.nome " + mittente.email);
            let busta: Messaggio.BustaMessaggio = new Messaggio.BustaMessaggio();
            let mess: Messaggio.Messaggio = new Messaggio.Messaggio();


            mess.mittente_key = val.token_dipendente_key;
            mess.destinatario_key = this.destinatarioSelezionato.dipendenti_key;
            mess.data = new Date().getTime().toString();
            mess.soggetto = this.oggetto;
            mess.messaggio = this.messaggio;
            mess.preferito = 'N';
            mess.stato_lettura = 'N';
            //stato_messaggio: string;
            mess.cognome_mit = mittente.cognome;
            mess.nome_mit = mittente.nome;
            mess.cognome_des = this.destinatarioSelezionato.cognome;
            mess.nome_des = this.destinatarioSelezionato.nome;

            busta.c_conoscenza = [];
            if (this.conoscenzeSelezionate != undefined) {
              for (let i = 0; i < this.conoscenzeSelezionate.length; i++) {
                let con: Messaggio.Conoscenza = new Messaggio.Conoscenza();
                con.dipendente_key = this.conoscenzeSelezionate[i].dipendenti_key;
                con.nominativo = this.conoscenzeSelezionate[i].cognome;
                busta.c_conoscenza.push(con);
              }
            }

            busta.messaggio = mess;
            busta.token = val.token_value;
            this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
              //var tokenValue = val.token_value;
              this.messaggiService.sendMessage(this.storeService.getLocalServerUrl(), busta).subscribe(r => {
                console.log(r);
                if (r.ErrorMessage.msg_code == 0) {
                  console.log(busta);
                  this.presentAlert("", "Messaggio inviato correttamente");
                  this.back();
                } else {
                  this.presentAlert("", "Errore nell'invio del messaggio");
                }
              });
            });
          } else {
            this.presentAlert("", "Errore recupero mittente");
          }
        })
      } else {
        this.presentAlert("", "Selezionare destinatario");
      }
    });
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

