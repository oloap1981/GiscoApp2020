import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuovoMessaggioPage } from './nuovo-messaggio.page';

describe('NuovoMessaggioPage', () => {
  let component: NuovoMessaggioPage;
  let fixture: ComponentFixture<NuovoMessaggioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovoMessaggioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuovoMessaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
