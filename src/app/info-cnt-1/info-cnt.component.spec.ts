import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoCntComponent1 } from './info-cnt.component';

describe('InfoCntComponent', () => {
  let component: InfoCntComponent1;
  let fixture: ComponentFixture<InfoCntComponent1>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCntComponent1 ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCntComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
