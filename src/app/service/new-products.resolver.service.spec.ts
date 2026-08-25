import { TestBed } from '@angular/core/testing';

import { NewProductsResolverService } from './new-products.resolver.service';

describe('NewProductsResolverService', () => {
  let service: NewProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
