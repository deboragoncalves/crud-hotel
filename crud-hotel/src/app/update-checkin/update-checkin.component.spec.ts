import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheckinComponent } from './update-checkin.component';

describe('UpdateCheckinComponent', () => {
  let component: UpdateCheckinComponent;
  let fixture: ComponentFixture<UpdateCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
