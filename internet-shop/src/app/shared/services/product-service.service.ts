import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../interfaces/product.inerfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  public getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  public setProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
  }


  public delProduct(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`)
  }


  public editProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product)
  }
}
