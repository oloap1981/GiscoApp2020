import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsMessaggioPage } from './details-messaggio.page';

describe('DetailsMessaggioPage', () => {
  let component: DetailsMessaggioPage;
  let fixture: ComponentFixture<DetailsMessaggioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMessaggioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsMessaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
