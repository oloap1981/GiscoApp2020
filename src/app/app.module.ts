import { HomePageModule } from './pages/home/home.module';
import { AttivitaService } from './services/attivita/attivita.service';
import { ComunicazioniService } from './services/comunicazioni/comunicazioni.service';
import { DispositiviService } from './services/dispositivi/dispositivi.service';
import { DocumentiService } from './services/documenti/documenti.service';
import { LoginService } from './services/login/login.service';
import { MessaggiService } from './services/messaggi/messaggi.service';
import { OsservazioniService } from './services/osservazioni/osservazioni.service';
import { ProcedimentiService } from './services/procedimenti/procedimenti.service';
import { ProfiloService } from './services/profilo/profilo.service';
import { AlertService } from './services/shared/alert.service';
import { CommonService } from './services/shared/common.service';
import { ErrorService } from './services/shared/error.service';
import { GeolocatedService } from './services/shared/geolocated.service';
import { HttpService } from './services/shared/http.service';
import { SitiService } from './services/siti/siti.service';
import { CheckService } from './services/shared/check.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicSelectableModule } from 'ionic-selectable/src/app/components/ionic-selectable/ionic-selectable.module';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from './services/store/store.service';
import { PrescrizioniService } from './services/prescrizioni/prescrizioni.service';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DashboardChiusuraPageModule } from './pages/osservazioni/dashboard-chiusura/dashboard-chiusura.module';
import { DashboardOsservazionePageModule } from './pages/osservazioni/dashboard-osservazione/dashboard-osservazione.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0ZS8b6gni8cmzaP6wANluaN7XWCvNtBc', 
      libraries: ['places']
    }),
    DashboardOsservazionePageModule,
    DashboardChiusuraPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoreService,
    CheckService,
    SitiService,
    HttpService,
    GeolocatedService,
    ErrorService,
    CommonService,
    AlertService,
    ProfiloService,
    ProcedimentiService,
    PrescrizioniService,
    OsservazioniService,
    MessaggiService,
    LoginService,
    DocumentiService,
    DispositiviService,
    ComunicazioniService,
    AttivitaService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
