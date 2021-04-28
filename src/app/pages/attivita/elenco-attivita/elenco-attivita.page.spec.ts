import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoAttivitaPage } from './elenco-attivita.page';

describe('ElencoAttivitaPage', () => {
  let component: ElencoAttivitaPage;
  let fixture: ComponentFixture<ElencoAttivitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoAttivitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoAttivitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
