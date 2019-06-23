import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { customersMockup } from '@cmsApp/shared/mockups/customers.mockup';
import { ordersMockup } from '@cmsApp/shared/mockups/orders.mockup';
import { produtsMockup } from '@cmsApp/shared/mockups/products.mockup';

/**
 *  backend emulation service
 */

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  /** mockup database server */
  createDb() {
    const customers = customersMockup;
    const orders = ordersMockup;
    const products = produtsMockup;
    return { customers, orders, products };

  }
}
