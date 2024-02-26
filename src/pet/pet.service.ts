import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pet } from "./schemas/pet.schema";
import { Model } from "mongoose";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetProfileDto } from "./dto/update-pet.dto";
import { OrderDto } from "./dto/oder-pet.dto";

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>) {}

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

  async findOne(id: string): Promise<Pet> {
    return this.petModel.findById(id).exec();
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
