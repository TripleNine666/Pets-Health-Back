import { Document } from "mongoose";
export interface Service extends Document {
  title: string;
  subService: Subservice[];
}
export interface Subservice extends Document {
  name: string;
  price: number;
}
