import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCrudComponent } from './brand-crud.component';

describe('BrandCrudComponent', () => {
  let component: BrandCrudComponent;
  let fixture: ComponentFixture<BrandCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
