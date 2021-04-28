import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoComunicazioniPage } from './elenco-comunicazioni.page';

describe('ElencoComunicazioniPage', () => {
  let component: ElencoComunicazioniPage;
  let fixture: ComponentFixture<ElencoComunicazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoComunicazioniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoComunicazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
