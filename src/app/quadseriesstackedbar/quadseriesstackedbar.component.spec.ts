import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadseriesstackedbarComponent } from './quadseriesstackedbar.component';

describe('QuadseriesstackedbarComponent', () => {
  let component: QuadseriesstackedbarComponent;
  let fixture: ComponentFixture<QuadseriesstackedbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadseriesstackedbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadseriesstackedbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
