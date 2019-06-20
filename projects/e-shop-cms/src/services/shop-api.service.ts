import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomerDTO } from '../shared/models/dto/customer-dto.model';
import { OrderDTO } from '../shared/models/dto/order-dto.model';
import { ProductDTO } from '../shared/models/dto/product-dto.model';

/**
 *  api service for retrievong data from server
 */

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {

  private customersURL = 'api/customers';
  private ordersURL = 'api/orders';
  private productsURL = 'api/products';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** get customers dictionary from API */
  public getCustomersDictionary(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(this.customersURL, this.httpOptions);
  }

  /** get orders from API */
  public getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.ordersURL, this.httpOptions);
  }

  /** get products dictionary from API */
  public getProductsDictionary(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.productsURL, this.httpOptions);
  }
}
