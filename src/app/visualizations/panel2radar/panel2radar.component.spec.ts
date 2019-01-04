import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Panel2radarComponent } from './panel2radar.component';

describe('Panel2radarComponent', () => {
  let component: Panel2radarComponent;
  let fixture: ComponentFixture<Panel2radarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Panel2radarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Panel2radarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
