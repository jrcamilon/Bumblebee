/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SplitterPaneRowComponent } from './splitter-pane-row.component';

describe('SplitterPaneRowComponent', () => {
  let component: SplitterPaneRowComponent;
  let fixture: ComponentFixture<SplitterPaneRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitterPaneRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitterPaneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
