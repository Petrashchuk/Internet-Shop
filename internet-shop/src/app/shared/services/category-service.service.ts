import {Injectable} from '@angular/core';
import {ICategory} from '../interfaces/category.inerfaces';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  public url: string;
  public ArrayCategory: Array<ICategory> = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category'
  }

  public getProductsCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url)
  }

  public setProductsCategory(product: ICategory): Observable<Array<ICategory>> {
    this.ArrayCategory.push(product);
    return this.http.post<Array<ICategory>>(this.url, product);
  }

  public delProductCategory(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  }

  public editProductCategory(product: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.url}/${product.id}`, product);

  }

}
