import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardOsservazionePage } from './dashboard-osservazione.page';

describe('DashboardOsservazionePage', () => {
  let component: DashboardOsservazionePage;
  let fixture: ComponentFixture<DashboardOsservazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOsservazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardOsservazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
