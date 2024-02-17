import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Clinic, ClinicSchema } from "./schemas/clinic.schema";
import { ServiceModule } from "../service/service.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema, collection: 'Clinics' }]),
    ServiceModule,
    AuthModule
  ],
  providers: [ClinicService],
  controllers: [ClinicController]
})
export class ClinicModule {}
