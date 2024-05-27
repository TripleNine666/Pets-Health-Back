import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetProfileDto } from "./dto/update-pet.dto";
import { OrderDto } from "./dto/oder-pet.dto";
import { PetWithClinic } from "./interfaces/pet.interface";
import { ClinicService } from "../clinic/clinic.service";

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>, private clinicService: ClinicService) {}

  async create(createPetDto: CreatePetDto, userId: string): Promise<Pet> {
    const createdPet = new this.petModel({
      userId,
      ...createPetDto,
    });
    return createdPet.save();
  }

  async findAllByUserId(userId: string): Promise<Pet[]> {
    return this.petModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<PetWithClinic> {
    const pet = await this.findOneFast(id, userId)

    const ordersWithClinic = await Promise.all(pet.orders.map(async (order) => {
      const clinic = await this.clinicService.getClinicById(order.clinicId);
      return {
        date: order.date,
        title: order.title,
        name: order.name,
        price: order.price,
        clinic: clinic
      };
    }));

    // Возвращаем объект питомца с информацией о клинике
    return {
      userId: pet.userId,
      name: pet.name,
      age: pet.age,
      type: pet.type,
      breed: pet.breed,
      sex: pet.sex,
      orders: ordersWithClinic
    };
  }

  async findOneFast(id: string, userId: string): Promise<Pet> {
    const pet = await this.petModel.findOne({ _id: id, userId }).exec();
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return pet;
  }

  async updatePetProfile(id: string, updatePetProfileDto: UpdatePetProfileDto): Promise<Pet> {
    return this.petModel.findByIdAndUpdate(id, updatePetProfileDto, { new: true }).exec();
  }

  async addOrderToPet(petId: string, orderDto: OrderDto): Promise<Pet> {
    const pet = await this.petModel.findById(petId);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    pet.orders.push({ ...orderDto, date: new Date(orderDto.date) });
    return await pet.save();
  }


  async delete(id: string): Promise<Pet> {
    const pet = await this.petModel.findByIdAndDelete(id);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    return pet;
  }
}
