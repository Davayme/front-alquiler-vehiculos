export interface IVehicle {
    vehicleId: number;
    brand: string;
    model: string;
    licensePlate: string;
    type: string;
    status: string;
    dailyRate: number;
    acquisitionDate: Date;
    mileage: number;
    location: string;
}