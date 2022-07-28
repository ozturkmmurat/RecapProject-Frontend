import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCrudComponent } from './car-crud.component';

describe('CarCrudComponent', () => {
  let component: CarCrudComponent;
  let fixture: ComponentFixture<CarCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
