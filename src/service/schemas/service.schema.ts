import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop()
  title: string;

  @Prop()
  subservices: Subservice[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

@Schema()
export class Subservice {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  subId: string;
}