import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardProfiloPage } from './dashboard-profilo.page';

describe('DashboardProfiloPage', () => {
  let component: DashboardProfiloPage;
  let fixture: ComponentFixture<DashboardProfiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProfiloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProfiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
