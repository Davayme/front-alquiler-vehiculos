import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVehicle } from '../Models/IVehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080/vehicles';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private readonly httpClient: HttpClient = inject(HttpClient);

  getAllVehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(this.baseUrl, {
      headers: this.headers,
    });
  }

  getVehicleById(id: number): Observable<IVehicle> {
    return this.httpClient.get<IVehicle>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createVehicle(vehicle: IVehicle): Observable<IVehicle> {
    return this.httpClient.post<IVehicle>(this.baseUrl, vehicle, {
      headers: this.headers,
    });
  }

  updateVehicle(id: number, vehicle: IVehicle): Observable<IVehicle> {
    return this.httpClient.put<IVehicle>(`${this.baseUrl}/${id}`, vehicle, {
      headers: this.headers,
    });
  }

  deleteVehicle(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
