import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordChartComponent } from './chord-chart.component';

describe('ChordChartComponent', () => {
  let component: ChordChartComponent;
  let fixture: ComponentFixture<ChordChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
