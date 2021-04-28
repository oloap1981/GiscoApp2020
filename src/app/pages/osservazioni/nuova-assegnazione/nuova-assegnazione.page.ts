import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';

import { Component, NgZone } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';
import { Dipendente } from '../../../models/dipendente/dipendente.namespace';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { Login } from '../../../models/login/login.namespace';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Osservazione } from '../../../models/osservazione/osservazione.namespace';
import { OsservazioniService } from '../../../services/osservazioni/osservazioni.service';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardOsservazionePage } from '../dashboard-osservazione/dashboard-osservazione.page';


@Component({
  selector: 'nuova-assegnazione',
  templateUrl: './nuova-assegnazione.page.html',
  styleUrls: ['./nuova-assegnazione.page.scss'],
})

export class NuovaAssegnazionePage extends BaseComponent {
  public listaNominativi: Array<Dipendente.Dipendente>;
  public nominativoSelezionato: Dipendente.Dipendente;
  public responsabile: boolean;

  private callbackReload: any;

  private selectedOsservazione: Osservazione.Osservazione;
  private idSitoSelected: string;
  color: string;
  icon: string;

  constructor(
    public navCtrl: NavController,
    public messaggiService: MessaggiService,
    public osservazioniService: OsservazioniService,
    public op: DashboardOsservazionePage,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone
    ) {
    super(router, ngZone);

    this.callbackReload = op.reloadOsservazioneCallbackFunction;
    
    //this.selectedOsservazione = navParams.get('osservazione');
    //this.callbackReload = navParams.get('callbackReload');
    //this.idSitoSelected = navParams.get('idSitoSelected');
  }

  async ionViewDidEnter() {

    this.route.queryParams.subscribe(params => {
      const p_osservazione = params['osservazione'];
      if (p_osservazione && p_osservazione !== '') {
        this.selectedOsservazione = JSON.parse(p_osservazione) as Osservazione.Osservazione;
      }

      const p_idSitoSelected = params['idSitoSelected'];
      if (p_idSitoSelected && p_idSitoSelected !== '') {
        this.idSitoSelected = p_idSitoSelected;
      }

    });

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getDipendentiAttiviSito(this.storeService.getLocalServerUrl(), this.idSitoSelected, tokenValue).subscribe(r => {
        this.listaNominativi = r.l_dipendenti;
        for (let i = 0; i < this.listaNominativi.length; i++) {
          this.listaNominativi[i].nomeCognome = this.listaNominativi[i].nome + " " + this.listaNominativi[i].cognome;
        }
      },
        (error) => {
          //this.back();
          this.presentAlert("", "errore recupero della risorsa");
        })
    });
  }

  filterPorts(ports: Array<Dipendente.Dipendente>, text: string) {
    return ports.filter(port => {
      return port.nome.toLowerCase().indexOf(text) !== -1 ||
        port.cognome.toLowerCase().indexOf(text) !== -1
    });
  }

  nominativoChange(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    console.log(event.text);
    if (event.text) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();
      console.log(text);
      if (!text || text == "") {
        event.component.items = this.listaNominativi;
        event.component.endSearch();
        return;
      }
      event.component.items = this.filterPorts(this.listaNominativi, text);
      event.component.endSearch();
    }
  }

  // back() {
  //   this.goToPage('dashboard-osservazione');
  //   // this.callbackReload(this.selectedOsservazione.attivita_key).then(() => {
  //   //   this.goToPage('dashboard-osservazione');
  //   // });
  // }

  public salvaAssegnazione() {

    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      if (this.nominativoSelezionato != null) {
        var ws_ass = new Osservazione.ws_Assegnazione();
        var assegnazione = new Osservazione.Assegnazione();
        assegnazione.attivita_key = this.selectedOsservazione.attivita_key;
        assegnazione.dp_cognome = this.nominativoSelezionato.cognome;
        assegnazione.dp_nome = this.nominativoSelezionato.nome;
        assegnazione.tab_ruolo_aziendale_desc = this.nominativoSelezionato.ruolo_aziendale;
        assegnazione.dp_email = this.nominativoSelezionato.email;
        assegnazione.dipendenti_key = this.nominativoSelezionato.dipendenti_key;
        if (this.responsabile)
          assegnazione.att_dip_scelta = "R";
        else {
          assegnazione.att_dip_scelta = "";

        }
        ws_ass.assegnazione = assegnazione;
        ws_ass.token = tokenValue;
        ws_ass.attivita_key = this.selectedOsservazione.attivita_key;
        this.osservazioniService.salvaAssegnazioneOsservazione(this.storeService.getLocalServerUrl(), ws_ass).subscribe(r => {
          console.log(r);
          if (r.ErrorMessage.msg_code == 0) {
            console.log(ws_ass);
            this.presentAlert("", "assegnazione salvata correttamente");
            //this.back();
          } else {
            this.presentAlert("", "Errore salvataggio assegnazione");
          }
        });

      } else {
        this.presentAlert("", "Selezionare nominativo");
      }
    });
  }

  async presentAlert(title: string, mess: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Confirm Okay');
          this.goToPage('dashboard-osservazione');
        }
      }]
    });
    (alert).present();
  }


}
