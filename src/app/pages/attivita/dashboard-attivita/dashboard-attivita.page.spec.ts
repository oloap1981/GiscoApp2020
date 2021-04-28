import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardAttivitaPage } from './dashboard-attivita.page';

describe('DashboardAttivitaPage', () => {
  let component: DashboardAttivitaPage;
  let fixture: ComponentFixture<DashboardAttivitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAttivitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAttivitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
