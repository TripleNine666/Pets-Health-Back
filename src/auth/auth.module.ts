import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/schemas/user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
  ]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
