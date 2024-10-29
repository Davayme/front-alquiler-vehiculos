import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';
import { ILogin } from '../Models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/auth';
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  login(credentials: ILogin): Observable<string> {
    return from(this.axiosClient.post<{ token: string }>('/login', credentials).then(response => response.data.token));
  }

  register(data: any): Observable<any> {
    return from(this.axiosClient.post('/register', data).then(response => response.data));
  }

  resetPassword(data: any): Observable<any> {
    return from(this.axiosClient.post('/forgot-password', data).then(response => response.data));
  }
}
