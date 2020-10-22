import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoOsservazioniPage } from './elenco-osservazioni.page';

describe('ElencoOsservazioniPage', () => {
  let component: ElencoOsservazioniPage;
  let fixture: ComponentFixture<ElencoOsservazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoOsservazioniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoOsservazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
