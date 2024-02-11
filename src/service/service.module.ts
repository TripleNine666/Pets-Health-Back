import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "./schemas/service.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema, collection: "Services" }]),
    AuthModule
  ],
  providers: [ServiceService],
  controllers: [ServiceController]
})
export class ServiceModule {}
