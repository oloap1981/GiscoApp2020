import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardComunicazionePage } from './dashboard-comunicazione.page';

describe('DashboardComunicazionePage', () => {
  let component: DashboardComunicazionePage;
  let fixture: ComponentFixture<DashboardComunicazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComunicazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComunicazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
