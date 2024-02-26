import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// @Schema()
// export class Order extends Document {
//   @Prop({ type: Date, required: true })
//   date: Date;
//
//   @Prop({ required: true })
//   title: string;
//
//   @Prop({ required: true })
//   name: string;
//
//   @Prop({ required: true })
//   price: number;
// }

@Schema()
export class Pet extends Document {
  @Prop({ required: true, })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop({ required: true })
  type: string;

  @Prop()
  breed: string;

  @Prop({ type: [{ date: Date, title: String, name: String, price: Number }], default: [] })
  orders: {
    date: Date;
    title: string;
    name: string;
    price: number;
  }[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);