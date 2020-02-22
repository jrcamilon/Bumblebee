import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElephantineComponent } from './elephantine.component';

describe('ElephantineComponent', () => {
  let component: ElephantineComponent;
  let fixture: ComponentFixture<ElephantineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElephantineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElephantineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
