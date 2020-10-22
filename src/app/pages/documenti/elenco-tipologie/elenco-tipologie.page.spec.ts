import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoTipologiePage } from './elenco-tipologie.page';

describe('ElencoTipologiePage', () => {
  let component: ElencoTipologiePage;
  let fixture: ComponentFixture<ElencoTipologiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoTipologiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoTipologiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
