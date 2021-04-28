import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoDispositiviPage } from './elenco-dispositivi.page';

describe('ElencoDispositiviPage', () => {
  let component: ElencoDispositiviPage;
  let fixture: ComponentFixture<ElencoDispositiviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoDispositiviPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoDispositiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
