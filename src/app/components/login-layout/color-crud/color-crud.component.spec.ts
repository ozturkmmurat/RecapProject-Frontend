import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCrudComponent } from './color-crud.component';

describe('ColorCrudComponent', () => {
  let component: ColorCrudComponent;
  let fixture: ComponentFixture<ColorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
