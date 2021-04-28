import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuovaAssegnazionePage } from './nuova-assegnazione.page';

describe('NuovaAssegnazionePage', () => {
  let component: NuovaAssegnazionePage;
  let fixture: ComponentFixture<NuovaAssegnazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovaAssegnazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuovaAssegnazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
