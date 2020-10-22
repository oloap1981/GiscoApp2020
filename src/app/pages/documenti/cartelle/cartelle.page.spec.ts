import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartellePage } from './cartelle.page';

describe('CartellePage', () => {
  let component: CartellePage;
  let fixture: ComponentFixture<CartellePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartellePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartellePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
