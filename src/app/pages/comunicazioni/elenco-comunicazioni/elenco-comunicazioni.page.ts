import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Procedimento } from '../../../models/procedimento/procedimento.namespace';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { Comunicazione } from '../../../models/comunicazione/comunicazione.namespace';
import { ComunicazioniService } from '../../../services/comunicazioni/comunicazioni.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'page-comunicazioni',
  templateUrl: './elenco-comunicazioni.page.html',
  styleUrls: ['./elenco-comunicazioni.page.scss'],
  
})
export class ElencoComunicazioniPage extends BaseComponent {
  public selectedProcedimento: Procedimento.Procedimento;
  public listaComunicazioni: Array<Array<Comunicazione.Comunicazione>>;
  public procedimentiTot: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comunicazioniService: ComunicazioniService,
    private storeService: StoreService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    this.listaComunicazioni = new Array<Array<Comunicazione.Comunicazione>>();

    this.route.queryParams.subscribe(params => {
      const p_procedimento = params['procedimento'];
      if (p_procedimento && p_procedimento !== ''){
        this.selectedProcedimento = JSON.parse(p_procedimento) as Procedimento.Procedimento;
        //console.log(p_procedimento);
      }
    });
    //this.selectedProcedimento = navParams.get('procedimento');
    this.procedimentiTot = 0;
  }

  async ionViewDidEnter() {
    console.log('ionViewDidLoad ElencoComunicazioniPage');
    let loading = await this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    loading.present();
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.comunicazioniService.getListaComunicazioni(this.storeService.getLocalServerUrl(), tokenValue, this.selectedProcedimento.pro_azienda_key, this.selectedProcedimento.procedimento_key).subscribe(r => {
        if (r.ErrorMessage.msg_code === 0) {
          console.log(r.ErrorMessage.msg_code);
          this.listaComunicazioni = r.l_lista_comunicazioni;
          console.log(this.listaComunicazioni.length);

          for (let comunicazioni of this.listaComunicazioni) {
            for (let comunicazione of comunicazioni) {
              this.procedimentiTot = this.procedimentiTot + comunicazione.pr_totali;
            }
          }
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentAlert("", err.statusText);
      })
    });
  }

  //navigazione verso la dashboard dello specifico sito selezionato
  public goToDetails(event, comunicazione) {
    console.log("goToDetailsComunicazione click" + comunicazione.comunicazioni_key);
    if (comunicazione.comunicazioni_key != 0) {
      this.goToPageParams('dashboard-comunicazione',
      {
        queryParams: {
          comunicazione: JSON.stringify(comunicazione)
        }
      });
      //this.navCtrl.push(DashboardComunicazionePage, { comunicazione: comunicazione })
    }
  }

  public getPreColor(comunicazione: Comunicazione.Comunicazione): string {

    if (comunicazione.pr_scadute > 0) {
      return 'danger';
    }
    else {
      if (comunicazione.pr_in_scadenza > 0) {
        return 'warning';
      }
      else {
        return 'done';
      }
    }
  }

  public getPreIcon(comunicazione: Comunicazione.Comunicazione): string {

    if (comunicazione.pr_scadute > 0) {
      return 'alert-circle';
    }
    else {
      if (comunicazione.pr_in_scadenza > 0) {
        return 'time';
      }
      else {
        return 'checkmark-circle';
      }
    }
  }

  async presentAlert(title: string, mess: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: mess,
      buttons: ['Ok']
    });
    alert.present();
  }
}

