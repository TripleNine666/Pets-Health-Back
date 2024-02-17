import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Clinic } from "./schemas/clinic.schema";
import { HydratedDocument, Model } from "mongoose";
import { Service } from "../service/schemas/service.schema";
import ClinicFull from "./interfaces/clinic.interface";

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Clinic.name) private clinicModel: Model<Clinic>,
  ) {}

  async getAllClinics(): Promise<ClinicFull[]> {
    const clinics: HydratedDocument<Clinic>[] = await this.clinicModel.find().exec();
    // Для каждой клиники делаем запрос к базе данных, чтобы получить список сервисов
    return this.prepareClinic(clinics)
  }

  async getClinicsByServiceId(serviceId: string): Promise<ClinicFull[]> {
    // Находим сервис по его _id
    const service = await this.serviceModel.findById(serviceId).exec();
    if (!service) {
      throw new Error(`Service with id ${serviceId} not found`);
    }

    // Находим клиники, предоставляющие этот сервис
    const clinics = await this.clinicModel.find({ serviceIds: serviceId }).exec();
    return this.prepareClinic(clinics);
  }

  private async prepareClinic(clinics: HydratedDocument<Clinic>[]): Promise<ClinicFull[]> {
    return await Promise.all(clinics.map(async (clinic: Clinic) => {
      const services = await this.serviceModel.find({ _id: { $in: clinic.serviceIds } }).exec();
      const clinicWithoutServiceIds = { ...clinic.toObject() };
      delete clinicWithoutServiceIds.serviceIds;
      return { ...clinicWithoutServiceIds, services }; // Возвращаем объект клиники с полем services
    }));
  }
}
