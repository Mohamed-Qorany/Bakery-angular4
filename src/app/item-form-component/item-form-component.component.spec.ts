import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormComponentComponent } from './item-form-component.component';

describe('ItemFormComponentComponent', () => {
  let component: ItemFormComponentComponent;
  let fixture: ComponentFixture<ItemFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
