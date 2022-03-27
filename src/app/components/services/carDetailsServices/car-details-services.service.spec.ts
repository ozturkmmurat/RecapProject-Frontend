import { TestBed } from '@angular/core/testing';
import { CarDetailsServices } from './car-details-services.service';

describe('CarDetailsServicesService', () => {
  let service: CarDetailsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDetailsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
