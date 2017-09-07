import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularPreLoaderComponent } from './circular-pre-loader.component';

describe('CircularPreLoaderComponent', () => {
  let component: CircularPreLoaderComponent;
  let fixture: ComponentFixture<CircularPreLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularPreLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularPreLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
