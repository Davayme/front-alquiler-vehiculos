import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';
import { IVehicle } from '../Models/IVehicle';

@Injectable({
 providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080/vehicles';
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAllVehicles(): Observable<IVehicle[]> {
    return from(this.axiosClient.get<IVehicle[]>('').then(response => response.data));
  }

  getVehicleById(id: number): Observable<IVehicle> {
    return from(this.axiosClient.get<IVehicle>(`${id}`).then(response => response.data));
  }

  createVehicle(vehicle: IVehicle): Observable<IVehicle> {
    return from(this.axiosClient.post<IVehicle>('', vehicle).then(response => response.data));
  }

  updateVehicle(id: number, vehicle: IVehicle): Observable<IVehicle> {
    return from(this.axiosClient.put<IVehicle>(`${id}`, vehicle).then(response => response.data));
  }

  deleteVehicle(id: number): Observable<void> {
    return from(this.axiosClient.delete<void>(`${id}`).then(response => response.data));
  }
}