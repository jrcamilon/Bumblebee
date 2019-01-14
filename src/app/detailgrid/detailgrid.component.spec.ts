/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailgridComponent } from './detailgrid.component';

describe('DetailgridComponent', () => {
  let component: DetailgridComponent;
  let fixture: ComponentFixture<DetailgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
