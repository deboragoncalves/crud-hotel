import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotelGuestsComponent } from './list-hotel-guests.component';

describe('ListHotelGuestsComponent', () => {
  let component: ListHotelGuestsComponent;
  let fixture: ComponentFixture<ListHotelGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHotelGuestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotelGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
