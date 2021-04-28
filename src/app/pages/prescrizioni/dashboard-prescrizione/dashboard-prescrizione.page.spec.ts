import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPrescrizionePage } from './dashboard-prescrizione.page';

describe('DashboardPrescrizionePage', () => {
  let component: DashboardPrescrizionePage;
  let fixture: ComponentFixture<DashboardPrescrizionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrescrizionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPrescrizionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
