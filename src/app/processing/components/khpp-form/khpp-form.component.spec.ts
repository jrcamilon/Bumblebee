/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhppFormComponent } from './khpp-form.component';

describe('KhppFormComponent', () => {
  let component: KhppFormComponent;
  let fixture: ComponentFixture<KhppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
