import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MappaDispositiviPage } from './mappa-dispositivi.page';

describe('MappaDispositiviPage', () => {
  let component: MappaDispositiviPage;
  let fixture: ComponentFixture<MappaDispositiviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaDispositiviPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MappaDispositiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
