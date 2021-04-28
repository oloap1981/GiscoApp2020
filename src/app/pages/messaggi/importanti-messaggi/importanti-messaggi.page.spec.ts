import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportantiMessaggiPage } from './importanti-messaggi.page';

describe('ImportantiMessaggiPage', () => {
  let component: ImportantiMessaggiPage;
  let fixture: ComponentFixture<ImportantiMessaggiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantiMessaggiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportantiMessaggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
