import { Document } from 'mongoose';

export interface Transaction extends Document {
  name: string;
  age: number;
  breed: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
