import { OrderDto } from "../pet/dto/oder-pet.dto";
import ClinicFull from "../clinic/interfaces/clinic.interface";
import { Pet } from "../pet/schemas/pet.schema";

export interface ISendMailPayload {
  name: string,
  orderDto: OrderDto,
  clinic: ClinicFull,
  pet: Pet
}