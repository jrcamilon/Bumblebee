import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProcessingComponent } from './detailed-processing.component';

describe('DetailedProcessingComponent', () => {
  let component: DetailedProcessingComponent;
  let fixture: ComponentFixture<DetailedProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
