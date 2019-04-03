/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FabricComparisonChartComponent } from './fabric-comparison-chart.component';

describe('FabricComparisonChartComponent', () => {
  let component: FabricComparisonChartComponent;
  let fixture: ComponentFixture<FabricComparisonChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricComparisonChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricComparisonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
