import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardChiusuraPage } from './dashboard-chiusura.page';

describe('DashboardChiusuraPage', () => {
  let component: DashboardChiusuraPage;
  let fixture: ComponentFixture<DashboardChiusuraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChiusuraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardChiusuraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
