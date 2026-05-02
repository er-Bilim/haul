export interface IReviewAuthor {
  _id: string;
  displayName: string;
}

export interface IReview {
  _id: string;
  text: string;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
  author: IReviewAuthor;
  establishment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IImage {
  _id: string;
  url: string;
}

export interface IEstablishment {
  _id: string;
  name: string;
  description: string;
  mainPhoto: string;
  owner: string;
  images: IImage[];
  reviews: IReview[];
  ratings: {
    overall: number;
    qualityOfFood: number;
    serviceQuality: number;
    interior: number;
  };
}

export interface ICreateEstablishment {
  name: string;
  description: string;
  mainPhoto: File | null;
  terms: boolean;
}

export interface ICreateReview {
  text: string;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
}
