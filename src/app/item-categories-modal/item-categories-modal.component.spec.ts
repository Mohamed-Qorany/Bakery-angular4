import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoriesModalComponent } from './item-categories-modal.component';

describe('ItemCategoriesModalComponent', () => {
  let component: ItemCategoriesModalComponent;
  let fixture: ComponentFixture<ItemCategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
