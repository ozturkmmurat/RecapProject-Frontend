import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandColorAddComponent } from './car-brand-color-add.component';

describe('CarBrandColorAddComponent', () => {
  let component: CarBrandColorAddComponent;
  let fixture: ComponentFixture<CarBrandColorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarBrandColorAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBrandColorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
