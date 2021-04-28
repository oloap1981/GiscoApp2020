import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoProcedimentiPage } from './elenco-procedimenti.page';

describe('ElencoProcedimentiPage', () => {
  let component: ElencoProcedimentiPage;
  let fixture: ComponentFixture<ElencoProcedimentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoProcedimentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoProcedimentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
