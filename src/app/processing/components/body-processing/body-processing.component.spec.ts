import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyProcessingComponent } from './body-processing.component';

describe('BodyProcessingComponent', () => {
  let component: BodyProcessingComponent;
  let fixture: ComponentFixture<BodyProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
