import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CestinoMessaggiPage } from './cestino-messaggi.page';

describe('CestinoMessaggiPage', () => {
  let component: CestinoMessaggiPage;
  let fixture: ComponentFixture<CestinoMessaggiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CestinoMessaggiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CestinoMessaggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
