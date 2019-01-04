import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Panel1radarComponent } from './panel1radar.component';

describe('Panel1radarComponent', () => {
  let component: Panel1radarComponent;
  let fixture: ComponentFixture<Panel1radarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Panel1radarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Panel1radarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
