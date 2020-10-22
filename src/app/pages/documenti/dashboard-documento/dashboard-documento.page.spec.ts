import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardDocumentoPage } from './dashboard-documento.page';

describe('DashboardDocumentoPage', () => {
  let component: DashboardDocumentoPage;
  let fixture: ComponentFixture<DashboardDocumentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDocumentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardDocumentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
