import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard-osservazione',
    loadChildren: () => import('./pages/osservazioni/dashboard-osservazione/dashboard-osservazione.module')
    .then( m => m.DashboardOsservazionePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./pages/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'elenco-osservazioni',
    loadChildren: () => import('./pages/osservazioni/elenco-osservazioni/elenco-osservazioni.module')
    .then( m => m.ElencoOsservazioniPageModule)
  },
  {
    path: 'cartelle',
    loadChildren: () => import('./pages/documenti/cartelle/cartelle.module').then( m => m.CartellePageModule)
  },
  {
    path: 'elenco-tipologie',
    loadChildren: () => import('./pages/documenti/elenco-tipologie/elenco-tipologie.module').then( m => m.ElencoTipologiePageModule)
  },
  {
    path: 'elenco-documenti',
    loadChildren: () => import('./pages/documenti/elenco-documenti/elenco-documenti.module').then( m => m.ElencoDocumentiPageModule)
  },
  {
    path: 'dashboard-documento',
    loadChildren: () => import('./pages/documenti/dashboard-documento/dashboard-documento.module').then( m => m.DashboardDocumentoPageModule)
  },
  {
    path: 'nuova-assegnazione',
    loadChildren: () => import('./pages/osservazioni/nuova-assegnazione/nuova-assegnazione.module').then( m => m.NuovaAssegnazionePageModule)
  },
  {
    path: 'dashboard-chiusura',
    loadChildren: () => import('./pages/osservazioni/dashboard-chiusura/dashboard-chiusura.module').then( m => m.DashboardChiusuraPageModule)
  },
  {
    path: 'elenco-siti',
    loadChildren: () => import('./pages/siti/elenco-siti/elenco-siti.module').then( m => m.ElencoSitiPageModule)
  },
  {
    path: 'dashboard-sito',
    loadChildren: () => import('./pages/siti/dashboard-sito/dashboard-sito.module').then( m => m.DashboardSitoPageModule)
  },
  {
    path: 'elenco-dispositivi',
    loadChildren: () => import('./pages/dispositivi/elenco-dispositivi/elenco-dispositivi.module').then( m => m.ElencoDispositiviPageModule)
  },
  {
    path: 'dashboard-dispositivo',
    loadChildren: () => import('./pages/dispositivi/dashboard-dispositivo/dashboard-dispositivo.module').then( m => m.DashboardDispositivoPageModule)
  },
  {
    path: 'elenco-attivita',
    loadChildren: () => import('./pages/attivita/elenco-attivita/elenco-attivita.module').then( m => m.ElencoAttivitaPageModule)
  },
  {
    path: 'dashboard-attivita',
    loadChildren: () => import('./pages/attivita/dashboard-attivita/dashboard-attivita.module').then( m => m.DashboardAttivitaPageModule)
  },
  {
    path: 'mappa-siti',
    loadChildren: () => import('./pages/siti/mappa-siti/mappa-siti.module').then( m => m.MappaSitiPageModule)
  },
  {
    path: 'mappa-dispositivi',
    loadChildren: () => import('./pages/dispositivi/mappa-dispositivi/mappa-dispositivi.module').then( m => m.MappaDispositiviPageModule)
  },
  {
    path: 'elenco-messaggi',
    loadChildren: () => import('./pages/messaggi/elenco-messaggi/elenco-messaggi.module').then( m => m.ElencoMessaggiPageModule)
  },
  {
    path: 'uscita-messaggi',
    loadChildren: () => import('./pages/messaggi/uscita-messaggi/uscita-messaggi.module').then( m => m.UscitaMessaggiPageModule)
  },
  {
    path: 'importanti-messaggi',
    loadChildren: () => import('./pages/messaggi/importanti-messaggi/importanti-messaggi.module').then( m => m.ImportantiMessaggiPageModule)
  },
  {
    path: 'cestino-messaggi',
    loadChildren: () => import('./pages/messaggi/cestino-messaggi/cestino-messaggi.module').then( m => m.CestinoMessaggiPageModule)
  },
  {
    path: 'details-messaggio',
    loadChildren: () => import('./pages/messaggi/details-messaggio/details-messaggio.module').then( m => m.DetailsMessaggioPageModule)
  },
  {
    path: 'nuovo-messaggio',
    loadChildren: () => import('./pages/messaggi/nuovo-messaggio/nuovo-messaggio.module').then( m => m.NuovoMessaggioPageModule)
  },
  {
    path: 'elenco-procedimenti',
    loadChildren: () => import('./pages/procedimenti/elenco-procedimenti/elenco-procedimenti.module').then( m => m.ElencoProcedimentiPageModule)
  },
  {
    path: 'dashboard-procedimento',
    loadChildren: () => import('./pages/procedimenti/dashboard-procedimento/dashboard-procedimento.module').then( m => m.DashboardProcedimentoPageModule)
  },
  {
    path: 'elenco-comunicazioni',
    loadChildren: () => import('./pages/comunicazioni/elenco-comunicazioni/elenco-comunicazioni.module').then( m => m.ElencoComunicazioniPageModule)
  },
  {
    path: 'dashboard-comunicazione',
    loadChildren: () => import('./pages/comunicazioni/dashboard-comunicazione/dashboard-comunicazione.module').then( m => m.DashboardComunicazionePageModule)
  },
  {
    path: 'dashboard-prescrizione',
    loadChildren: () => import('./pages/prescrizioni/dashboard-prescrizione/dashboard-prescrizione.module').then( m => m.DashboardPrescrizionePageModule)
  },
  {
    path: 'dashboard-profilo',
    loadChildren: () => import('./pages/profilo/dashboard-profilo/dashboard-profilo.module').then( m => m.DashboardProfiloPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings/settings.module').then( m => m.SettingsPageModule)
  },
];

// this.pages = [
//   { title: 'Home', component: HomePage, icon: 'home' },
//   { title: 'Elenco Siti', component: ElencoSitiPage, icon: 'list-box' },
//   { title: 'Mappa Siti', component: MappaSitiPage, icon: 'navigate' },
//   { title: 'Elenco Dispositivi', component: ElencoDispositiviPage, icon: 'list-box' },
//   { title: 'Mappa Dispositivi', component: MappaDispositiviPage, icon: 'navigate' },
//   { title: 'Documenti', component: CartellePage, icon: 'document' },
//   { title: 'Messaggi', component: ElencoMessaggiPage, icon: 'chatboxes' },
//   { title: 'Procedimenti', component: ElencoProcedimentiPage, icon: 'home' },
//   { title: 'Osservazioni', component: ElencoOsservazioniPage, icon: 'eye' },
//   { title: 'Attività', component: ElencoAttivitaPage, icon: 'analytics' },
//   { title: 'Profilo', component: DashboardProfiloPage, icon: 'person' },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
