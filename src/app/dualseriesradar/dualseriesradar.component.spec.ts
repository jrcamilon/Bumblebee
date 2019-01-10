import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualseriesradarComponent } from './dualseriesradar.component';

describe('DualseriesradarComponent', () => {
  let component: DualseriesradarComponent;
  let fixture: ComponentFixture<DualseriesradarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualseriesradarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualseriesradarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
