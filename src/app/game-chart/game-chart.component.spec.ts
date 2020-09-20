import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { gameChartComponent } from './game-chart.component';

describe('gameChartComponent', () => {
  let component: gameChartComponent;
  let fixture: ComponentFixture<gameChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ gameChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(gameChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
