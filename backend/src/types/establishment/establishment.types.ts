import type { Types } from 'mongoose';

export interface IEstablishment {
  name: string;
  description: string;
  mainPhoto: string | null;
  owner: Types.ObjectId;
  images: Types.ObjectId[];
  reviews: Types.ObjectId[];
}

export interface IEstablishmentSave {
  name: string;
  description: string;
  mainPhoto: string | null;
  owner: Types.ObjectId;
}
