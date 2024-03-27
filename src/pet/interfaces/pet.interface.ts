import { OrderDto } from '../dto/oder-pet.dto';
import ClinicFull from '../../clinic/interfaces/clinic.interface';

export interface IPet {
  _id: string;
  name: string;
  age: number;
  type: string;
  breed?: string;
  orders?: OrderDto[];
}

export interface PetWithClinic {
  userId: string;
  name: string;
  age: number;
  type: string;
  breed: string;
  sex: string;
  orders: {
    date: Date;
    title: string;
    name: string;
    price: number;
    clinic: ClinicFull; // Заменяем clinicId на объект клиники
  }[];
}
