import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../Services/vehicle.service';
import { IVehicle } from '../../Models/IVehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css']
})
export class VehiclesTableComponent implements OnInit {
  vehicles: IVehicle[] = [];
  isModalOpen = false;
  isDeleteModalOpen = false;
  modalTitle = '';
  selectedVehicle: IVehicle = {} as IVehicle;
  vehicleToDeleteId: number | null = null;
  today: string = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe((data: IVehicle[]) => {
      this.vehicles = data;
    });
  }

  openModal(mode: string, vehicle?: IVehicle): void {
    this.isModalOpen = true;
    if (mode === 'add') {
      this.modalTitle = 'Agregar Vehículo';
      this.selectedVehicle = {} as IVehicle;
    } else if (mode === 'edit' && vehicle) {
      this.modalTitle = 'Editar Vehículo';
      this.selectedVehicle = { ...vehicle };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.selectedVehicle.vehicleId) {
      this.vehicleService.updateVehicle(this.selectedVehicle.vehicleId, this.selectedVehicle).subscribe(() => {
        this.loadVehicles();
        this.closeModal();
      });
    } else {
      this.vehicleService.createVehicle(this.selectedVehicle).subscribe(() => {
        this.loadVehicles();
        this.closeModal();
      });
    }
  }

  openDeleteModal(id: number): void {
    this.vehicleToDeleteId = id;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.vehicleToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.vehicleToDeleteId !== null) {
      this.vehicleService.deleteVehicle(this.vehicleToDeleteId).subscribe(() => {
        this.loadVehicles();
        this.closeDeleteModal();
      });
    }
  }

  // Función para validar si la fecha de adquisición es futura
  isFutureDate(): boolean {
    return new Date(this.selectedVehicle.acquisitionDate) > new Date(this.today);
  }
}