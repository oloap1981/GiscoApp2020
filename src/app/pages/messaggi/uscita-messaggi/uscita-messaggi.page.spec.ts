import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UscitaMessaggiPage } from './uscita-messaggi.page';

describe('UscitaMessaggiPage', () => {
  let component: UscitaMessaggiPage;
  let fixture: ComponentFixture<UscitaMessaggiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UscitaMessaggiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UscitaMessaggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
