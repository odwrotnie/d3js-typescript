import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinTheBottleComponent } from './spin-the-bottle.component';

describe('SpinTheBottleComponent', () => {
  let component: SpinTheBottleComponent;
  let fixture: ComponentFixture<SpinTheBottleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinTheBottleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinTheBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
