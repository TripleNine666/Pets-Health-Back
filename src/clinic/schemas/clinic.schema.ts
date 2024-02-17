import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from "mongoose";

@Schema()
export class Clinic extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Service' }] })
  serviceIds: Types.ObjectId[];

  @Prop()
  address: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);