import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoDocumentiPage } from './elenco-documenti.page';

describe('ElencoDocumentiPage', () => {
  let component: ElencoDocumentiPage;
  let fixture: ComponentFixture<ElencoDocumentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoDocumentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoDocumentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
