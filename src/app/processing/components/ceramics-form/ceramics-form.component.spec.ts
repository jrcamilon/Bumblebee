import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeramicsFormComponent } from './ceramics-form.component';

describe('CeramicsFormComponent', () => {
  let component: CeramicsFormComponent;
  let fixture: ComponentFixture<CeramicsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeramicsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeramicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
