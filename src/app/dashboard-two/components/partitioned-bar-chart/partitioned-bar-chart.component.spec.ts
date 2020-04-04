import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionedBarChartComponent } from './partitioned-bar-chart.component';

describe('PartitionedBarChartComponent', () => {
  let component: PartitionedBarChartComponent;
  let fixture: ComponentFixture<PartitionedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitionedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
