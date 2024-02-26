import { OrderDto } from "../dto/oder-pet.dto";


export interface IPet {
  _id: string;
  name: string;
  age: number;
  type: string;
  breed?: string;
  orders?: OrderDto[];
}