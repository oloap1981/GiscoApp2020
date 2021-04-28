import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoMessaggiPage } from './elenco-messaggi.page';

describe('ElencoMessaggiPage', () => {
  let component: ElencoMessaggiPage;
  let fixture: ComponentFixture<ElencoMessaggiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoMessaggiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoMessaggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
