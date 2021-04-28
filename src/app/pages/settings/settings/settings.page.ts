import { Component, Inject, forwardRef, NgZone} from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { StoreService } from '../../../services/store/store.service';
import { AlertService } from '../../../services/shared/alert.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],

})
export class SettingsPage extends BaseComponent {

  public servername: string = ""; 
  
  constructor(@Inject(forwardRef(() => StoreService)) private store: StoreService,
    private loginService: LoginService,
    private alertService: AlertService,
    public router: Router,
    public ngZone: NgZone) {

    super(router, ngZone);
    var self = this;
    store.getServerUrl().then(function(url: string) {
      self.servername = url;
    });
  }

  public saveSettings(): void {
    this.loginService.checkServerValidity(this.servername)
      .subscribe(r => {
        if(r.result == 'OK'){
          this.store.setServer(this.servername);
          this.alertService.presentAlert("Url server salvata correttamente");
        } else {
          this.alertService.presentErrorAlert(r.ErrorMessage.msg_testo);
        }
      }, 
      error => {
        this.alertService.presentServerInputAlert("Indirizzo Server Sbagliato");
      });
  }
  
}

