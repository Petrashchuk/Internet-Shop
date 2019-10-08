import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddressProductService {
  private url: string;


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  public getFullOrders(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url);
  }

  public setFullOrders(address: any): Observable<Array<any>> {
    debugger
    return this.http.post<Array<any>>(this.url, address);

  }
}
