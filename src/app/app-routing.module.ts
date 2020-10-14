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
