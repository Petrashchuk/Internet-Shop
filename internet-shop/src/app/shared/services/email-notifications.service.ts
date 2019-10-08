import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationsService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/email_notification';
  }

  public getEmail(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url);
  }

  public setEmail(email: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.url, email);
  }
}
