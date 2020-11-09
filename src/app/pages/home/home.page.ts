import { Component, NgZone, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/dist/Chart.js';
import { NavController, LoadingController } from '@ionic/angular';
// import { DashboardOsservazionePage } from '../osservazioni/dashboard-osservazione/dashboard-osservazione';
// import { DashboardAttivitaPage } from '../attivita/dashboard-attivita/dashboard-attivita';

import { StoreService } from '../../services/store/store.service';
import { AttivitaService } from '../../services/attivita/attivita.service';
import { CommonService } from '../../services/shared/common.service';

import { Attivita } from '../../models/attivita/attivita.namespace';
import { Login } from '../../models/login/login.namespace';
import { Common } from '../../models/common/common.namespace';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends BaseComponent {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('stackedCanvas') stackedCanvas;

  doughnutChart: any;
  stackedBar: any;

  private serverUrl = '';

  public prescrizioniChartData: Common.PrescrizioniChartData;
  public attivitaChartData: Array<Common.AttivitaChartData>;
  public listaAttivita: Array<Attivita.Attivita>;

  public listaAttivitaVisibile = true;
  public attivitaChartVisible = true;
  public prescrizioniChartVisible = true;

  constructor(public navCtrl: NavController,
              public storeService: StoreService,
              public attivitaService: AttivitaService,
              public commonService: CommonService,
              public loadingCtrl: LoadingController,
              public router: Router,
              public ngZone: NgZone) {

    super(router, ngZone);

    this.listaAttivita = new Array<Attivita.Attivita>();
    this.prescrizioniChartData = new Common.PrescrizioniChartData();
    this.attivitaChartData = new Array<Common.AttivitaChartData>();
  }

  public ionViewDidEnter(): void {
    this.storeService.getServerUrl().then((url: string) => {
      this.serverUrl = url;
      this.storeService.getUserDataPromise(url).then((val: Login.ws_Token) => {
        this.getAttivita(val.token_value);
        this.createPrescrizioniChart(val.token_value);
        this.createAttivitaChart(val.token_value);
      });
    });
  }

  public createAttivitaChart(tokenValue: string) {
    this.commonService.getAttivitaChartData(tokenValue, this.serverUrl).subscribe(data => {
      if (data.ErrorMessage.msg_code === 0) {

        this.attivitaChartVisible = data['visible'] === 'S';

        const labels = new Array<string>();

        const datasetScadute = new Array<number>();
        const datasetInScadenza = new Array<number>();
        const datasetFuture = new Array<number>();

        const elencoAttivita = data.l_attivita;

        for (const attivita of elencoAttivita) {
          labels.push(attivita.tab_tipo_attivita_desc);
          datasetScadute.push(attivita.at_scadute);
          datasetInScadenza.push(attivita.at_in_scadenza);
          datasetFuture.push(attivita.at_future);
        }

        const barChartData = {
          labels,
          datasets: [{
            label: 'Scadute',
            backgroundColor: '#F96868',
            data: datasetScadute
          }, {
            label: 'In Scadenza',
            backgroundColor: '#F3A754',
            data: datasetInScadenza
          }, {
            label: 'Future',
            backgroundColor: '#62A9EB',
            data: datasetFuture
          }]
        };


        this.stackedBar = new Chart(this.stackedCanvas.nativeElement, {
          type: 'bar',
          data: barChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
              xAxes: [{
                barPercentage: 1,
                barThickness: 15,
                gridLines: {
                  offsetGridLines: true
                },
                stacked: true
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    });
  }

  public createPrescrizioniChart(tokenValue: string) {
    this.commonService.getPrescrizioniChartData(tokenValue, this.serverUrl).subscribe(data => {

      if (data.ErrorMessage.msg_code === 0) {
        const labels = new Array<string>();
        const dataSet = new Array<number>();
        const colors = new Array<string>();

        this.prescrizioniChartVisible = data['visible'] === 'S';

        const prescrizioni = data.s_prescrizioni;

        labels.push(prescrizioni.pr_label_in_scadenza);
        dataSet.push(prescrizioni.pr_in_scadenza);
        colors.push(prescrizioni.pr_colore_in_scadenza);

        // labels.push(prescrizioni.pr_label_ottemperate);
        // dataSet.push(prescrizioni.pr_ottemperate);
        // colors.push(prescrizioni.pr_colore_ottemperate);

        labels.push(prescrizioni.pr_label_prossime);
        dataSet.push(prescrizioni.pr_prossime);
        colors.push(prescrizioni.pr_colore_prossime);

        labels.push(prescrizioni.pr_label_scadute);
        dataSet.push(prescrizioni.pr_scadute);
        colors.push(prescrizioni.pr_colore_scadute);

        // labels.push(prescrizioni.pr_label_senza_data);
        // dataSet.push(prescrizioni.pr_senza_data);
        // colors.push(prescrizioni.pr_colore_senza_data);

        // labels.push(prescrizioni.pr_label_vincolate);
        // dataSet.push(prescrizioni.pr_vincolate);
        // colors.push(prescrizioni.pr_colore_vincolate);

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              label: '# of Votes',
              data: dataSet,
              backgroundColor: colors,
              hoverBackgroundColor: colors
            }]
          },
          options: {
            maintainAspectRatio: false,
            aspectRatio: 1
          }

        });
      }
    });
  }

  public async getAttivita(tokenValue: string, infiniteScroll?) {
    const loading = this.loadingCtrl.create({
      message: 'Caricamento...'
    });
    if (!infiniteScroll) {
      (await loading).present();
    }
    // (token: string, categoria: any, tipo_cod: any, sito_cod: string, from: number, to: number)
    this.attivitaService.getMieAttivita(this.serverUrl, tokenValue).subscribe(async r => {
      console.log('getAttivita');
      if (r.ErrorMessage.msg_code === 0) {
        console.log(r.ErrorMessage.msg_code);
        if (!infiniteScroll) {
          this.listaAttivita.length = 0;
          this.listaAttivita = r.l_lista_attivita;
        } else {
          infiniteScroll.complete();
          this.listaAttivita.push(...r.l_lista_attivita);
        }
      }
      (await loading).dismiss();
    });
  }

  public getDotPath(osservazione: Attivita.Attivita): string {
    switch (osservazione.att_stato_attivita) {
      case 'FU':
        return '/assets/imgs/dot_blu.png';
      case 'SC':
        return '/assets/imgs/dot_giallo.png';
      case 'KO':
        return '/assets/imgs/dot_rosso.png';
      case 'OK':
        return '/assets/imgs/dot_verde.png';
      default:
        return '/assets/imgs/dot_giallo.png';
    }
  }

  public goToNuovaOsservazione() {
    console.log('goToNuovaOsservazione click');
    this.goToPage('dashboard-osservazione');
    // this.navCtrl.push(DashboardOsservazionePage);
  }

  public goToDetails(attivita: Attivita.Attivita) {
    this.goToPageParams('dashboard-attivita',
      {
        queryParams: {
          selectedAttivita: attivita,
          callbackChiusa: false
        }
      });
    // this.navCtrl.push(DashboardAttivitaPage, {
    //   selectedAttivita: attivita,
    //   callbackChiusa: false
    // });
  }
}
