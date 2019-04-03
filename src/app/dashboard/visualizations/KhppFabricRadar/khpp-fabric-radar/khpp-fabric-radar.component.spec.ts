/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhppFabricRadarComponent } from './khpp-fabric-radar.component';

describe('KhppFabricRadarComponent', () => {
  let component: KhppFabricRadarComponent;
  let fixture: ComponentFixture<KhppFabricRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhppFabricRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhppFabricRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
