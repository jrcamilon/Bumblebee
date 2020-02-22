import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedEleProcessingComponent } from './detailed-ele-processing.component';

describe('DetailedEleProcessingComponent', () => {
  let component: DetailedEleProcessingComponent;
  let fixture: ComponentFixture<DetailedEleProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedEleProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedEleProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
