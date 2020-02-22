import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProcessingComponent } from './basic-processing.component';

describe('BasicProcessingComponent', () => {
  let component: BasicProcessingComponent;
  let fixture: ComponentFixture<BasicProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
