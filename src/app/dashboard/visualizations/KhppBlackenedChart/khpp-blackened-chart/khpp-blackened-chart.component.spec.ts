/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhppBlackenedChartComponent } from './khpp-blackened-chart.component';

describe('KhppBlackenedChartComponent', () => {
  let component: KhppBlackenedChartComponent;
  let fixture: ComponentFixture<KhppBlackenedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhppBlackenedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhppBlackenedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
