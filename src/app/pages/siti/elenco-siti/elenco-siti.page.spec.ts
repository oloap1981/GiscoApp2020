import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoSitiPage } from './elenco-siti.page';

describe('ElencoSitiPage', () => {
  let component: ElencoSitiPage;
  let fixture: ComponentFixture<ElencoSitiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoSitiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoSitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
