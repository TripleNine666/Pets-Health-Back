import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Pet, PetSchema } from "./schemas/pet.schema";
import { ClinicModule } from "../clinic/clinic.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema, collection: "Pets" }]),
    AuthModule,
    ClinicModule,
    MailModule
  ],
  providers: [PetService],
  controllers: [PetController]
})
export class PetModule {}
