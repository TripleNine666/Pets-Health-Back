import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/interfaces/user.interface";
import { JwtPayload, sign } from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createAccessToken(userId: string, name:string, email: string) {
    return sign({ userId, name, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  }
  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({_id: jwtPayload.userId});
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }
  jwtExtractor(request) {
    let token = null;
    if (request.header('x-token')) {
      token = request.get('x-token');
    } else if (request.headers.authorization) {
      token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
    } else if (request.body.token) {
      token = request.body.token.replace(' ', '');
    }
    if (request.query.token) {
      token = request.body.token.replace(' ', '');
    }
    if (token) {
      try {
        return token;
      } catch (err) {
        throw new BadRequestException('Bad request.');
      }
    }
  }

  // ***********************
  // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ***********************
  returnJwtExtractor() {
    return this.jwtExtractor;
  }
}
