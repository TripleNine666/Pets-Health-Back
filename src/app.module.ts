import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { ClinicModule } from './clinic/clinic.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    ServiceModule,
    ClinicModule,
    PetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}