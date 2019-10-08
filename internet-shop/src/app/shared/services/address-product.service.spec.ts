import { TestBed } from '@angular/core/testing';

import { AddressProductService } from './address-product.service';

describe('AddressProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressProductService = TestBed.get(AddressProductService);
    expect(service).toBeTruthy();
  });
});
