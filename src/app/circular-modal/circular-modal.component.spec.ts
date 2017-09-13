import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularModalComponent } from './circular-modal.component';

describe('CircularModalComponent', () => {
  let component: CircularModalComponent;
  let fixture: ComponentFixture<CircularModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
