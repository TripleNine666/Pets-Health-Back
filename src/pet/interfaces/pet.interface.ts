import { OrderDto } from "../dto/oder-pet.dto";
import { Clinic } from "../../clinic/schemas/clinic.schema";


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
    clinic: Clinic; // Заменяем clinicId на объект клиники
  }[];
}