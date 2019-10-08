import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {IProduct} from '../interfaces/product.inerfaces';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private url: string;
  public getProduct: IProduct[] = [];
  ordersStream: Subject<IProduct> = new Subject<IProduct>();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  public getProuctDetails(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

}
