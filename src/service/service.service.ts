import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Service } from "./schemas/service.schema";
import { Model } from "mongoose";

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }
}
