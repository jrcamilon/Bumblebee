/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RednotebookFormComponent } from './rednotebook-form.component';

describe('RednotebookFormComponent', () => {
  let component: RednotebookFormComponent;
  let fixture: ComponentFixture<RednotebookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RednotebookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RednotebookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
