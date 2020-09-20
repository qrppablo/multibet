import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBetComponent } from './form-bet.component';

describe('FormBetComponent', () => {
  let component: FormBetComponent;
  let fixture: ComponentFixture<FormBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
