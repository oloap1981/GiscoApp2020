import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MappaSitiPage } from './mappa-siti.page';

describe('MappaSitiPage', () => {
  let component: MappaSitiPage;
  let fixture: ComponentFixture<MappaSitiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaSitiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MappaSitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
