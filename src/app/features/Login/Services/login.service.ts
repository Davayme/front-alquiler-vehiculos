import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILogin } from '../Models/ILogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private readonly httpClient: HttpClient = inject(HttpClient);

  login(credentials: ILogin): Observable<string> {
    return this.httpClient
      .post<{ token: string }>(`${this.baseUrl}/login`, credentials, {
        headers: this.headers,
      })
      .pipe(map((response) => response.token));
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/register`, data, {
      headers: this.headers,
    });
  }

  resetPassword(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/forgot-password`, data, {
      headers: this.headers,
    });
  }
}
