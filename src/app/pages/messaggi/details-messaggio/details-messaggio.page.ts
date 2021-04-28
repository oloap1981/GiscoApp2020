import { NavController, NavParams, AlertController } from '@ionic/angular';
import { Component, NgZone } from '@angular/core';
import { Messaggio } from '../../../models/messaggio/messaggio.namespace';
import { StoreService } from '../../../services/store/store.service';
import { Login } from '../../../models/login/login.namespace';
import { MessaggiService } from '../../../services/messaggi/messaggi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';


@Component({
  selector: 'details-messaggio',
  templateUrl: './details-messaggio.page.html',
  styleUrls: ['./details-messaggio.page.scss'],

})

export class DetailsMessaggioPage extends BaseComponent {

  public mess: Messaggio.Messaggio;
  public onlyNotImportant: boolean;
  public messagioCestino: boolean;
  color: string;
  icon: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private storeService: StoreService,
    private messaggiService: MessaggiService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);

    this.route.queryParams.subscribe(params => {
      const p_mess = params['mess'];
      if (p_mess && p_mess !== ''){
        this.mess = JSON.parse(p_mess) as Messaggio.Messaggio;
      }
      const p_only = params['onlyNotImportant'];
      if (p_only && p_only !== ''){
        this.onlyNotImportant = p_only;
      }
      const p_cest = params['messagioCestino'];
      if (p_cest && p_cest !== ''){
        this.messagioCestino = p_cest;
      }
      
    });
    //this.mess = this.navParams.get('mess');
    //this.onlyNotImportant = this.navParams.get('');
    //this. = this.navParams.get('');
    //this.callback = this.navParams.get("callback");
    console.log(this.mess);
  }

  ionViewDidEnter() {
    console.log("this.onlyNotImportant " + this.onlyNotImportant);
    console.log("this.messagioCestino " + this.messagioCestino);
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.getMessaggio(this.storeService.getLocalServerUrl(), this.mess.messaggi_key, tokenValue).subscribe(r => {
        this.mess = r.messaggio;
        console.log(this.mess);
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }


  setDelete(mess: Messaggio.Messaggio) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setDeleteMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, tokenValue).subscribe(r => {
        console.log(r);
        if (mess.preferito && mess.preferito === 'S') {
          this.goToPage('importanti-messaggi');
        } else {
          if (mess.stato_messaggio === 'DEL') {
            this.goToPage('cestino-messaggi');
          } else if (mess.stato_messaggio === 'INV') {
            this.goToPage('uscita-messaggi');
          } else if (mess.stato_messaggio === 'RIC') {
            this.goToPage('elenco-messaggi');
          } else {
            this.goToPage('elenco-messaggi');
          }
        }
        //this.navCtrl.push(ElencoMessaggiPage);
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  async deleteConfirm(mess: Messaggio.Messaggio) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma',
      subHeader: 'Spostare questo messaggio nel cestino?',
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
            this.setDelete(mess);
          }
        }
      ]
    });
    alert.present();
  }

  setStar(mess: Messaggio.Messaggio, stato) {
    this.storeService.getUserDataPromise(this.storeService.getLocalServerUrl()).then((val: Login.ws_Token) => {
      var tokenValue = val.token_value;
      this.messaggiService.setStarMessage(this.storeService.getLocalServerUrl(), mess.messaggi_key, stato, tokenValue).subscribe(r => {
        mess.preferito = stato;
      },
        (error) => {
          console.log(error);
        }
      )
    });

  }

  reply(mess: Messaggio.Messaggio) {
    this.goToPageParams('nuovo-messaggio',
    {
      queryParams: {
        reply: JSON.stringify(mess)
      }
    });
    //this.navCtrl.push(NuovoMessaggioPage, { reply: mess })
  }

  inoltro(mess: Messaggio.Messaggio) {
    this.goToPageParams('nuovo-messaggio',
    {
      queryParams: {
        inoltro: JSON.stringify(mess)
      }
    });
    //this.navCtrl.push(NuovoMessaggioPage, { inoltro: mess })
  }

}

