import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  post<T>(data: any, endpoint: string): Observable<T> {
    let headers : any = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'key': 'x-api-key'
      })
    }
    return this.http.post<any>(`${environment.baseApiUrl}` + endpoint, data, headers)
      .pipe( map ( (response :any) => {
          return response;
        }
      ));
  }

}
