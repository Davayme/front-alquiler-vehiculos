import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { VehiclesTableComponent } from './vehicles-table.component';
import { VehicleService } from '../../Services/vehicle.service';
import { IVehicle } from '../../Models/IVehicle';

describe('VehiclesTableComponent', () => {
  let fixture: ComponentFixture<VehiclesTableComponent>;
  let component: VehiclesTableComponent;
  let vehicleService: jasmine.SpyObj<VehicleService>;

  const mockVehicles: IVehicle[] = [
    {
      vehicleId: 1,
      brand: 'Toyota',
      model: 'Corolla',
      licensePlate: 'ABC123',
      type: 'Sedan',
      status: 'Available',
      dailyRate: 30,
      acquisitionDate: new Date('2023-01-01'),
      mileage: 15000,
      location: 'Location A',
    },
    {
      vehicleId: 2,
      brand: 'Honda',
      model: 'Civic',
      licensePlate: 'DEF456',
      type: 'Sedan',
      status: 'Available',
      dailyRate: 35,
      acquisitionDate: new Date('2023-01-05'),
      mileage: 12000,
      location: 'Location B',
    },
  ];

  beforeEach(async () => {
    vehicleService = jasmine.createSpyObj('VehicleService', [
      'getAllVehicles',
      'createVehicle',
      'updateVehicle',
      'deleteVehicle',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, VehiclesTableComponent],
      providers: [{ provide: VehicleService, useValue: vehicleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on initialization', () => {
    vehicleService.getAllVehicles.and.returnValue(of(mockVehicles));

    component.ngOnInit();

    expect(vehicleService.getAllVehicles).toHaveBeenCalled();
    expect(component.vehicles.length).toBe(2);
    expect(component.vehicles).toEqual(mockVehicles);
  });

  it('should handle error when loading vehicles', () => {
    vehicleService.getAllVehicles.and.returnValue(
      throwError(() => new Error('Failed to load vehicles'))
    );

    component.ngOnInit();

    expect(component.errorMessage).toBe(
      'Failed to load vehicles. Please try again later.'
    );
  });

  it('should delete a vehicle', () => {
    vehicleService.getAllVehicles.and.returnValue(of(mockVehicles));
    component.ngOnInit();
    const vehicleIdToDelete = mockVehicles[0].vehicleId;
    component.openDeleteModal(vehicleIdToDelete);

    vehicleService.deleteVehicle.and.returnValue(of());

    component.confirmDelete();

    expect(vehicleService.deleteVehicle).toHaveBeenCalledWith(
      vehicleIdToDelete
    );
    expect(component.vehicles.length).toBe(2);
  });
});
