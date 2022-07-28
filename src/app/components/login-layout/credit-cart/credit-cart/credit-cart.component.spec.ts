import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCartComponent } from './credit-cart.component';

describe('CreditCartComponent', () => {
  let component: CreditCartComponent;
  let fixture: ComponentFixture<CreditCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
