import axiosApi from '@/api/axiosApi';
import type {
  IEstablishment,
  ICreateEstablishment,
  ICreateReview,
} from '@/types/establishment.types';

export const getAll = async (): Promise<IEstablishment[]> => {
  const response = await axiosApi.get<IEstablishment[]>('/establishments');
  return response.data;
};

export const getById = async (id: string): Promise<IEstablishment> => {
  const response = await axiosApi.get<IEstablishment>(`/establishments/${id}`);
  return response.data;
};

export const createEstablishment = async (
  data: ICreateEstablishment,
): Promise<IEstablishment> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('terms', String(data.terms));
  if (data.mainPhoto) formData.append('mainPhoto', data.mainPhoto);

  const response = await axiosApi.post<IEstablishment>(
    '/establishments',
    formData,
  );
  return response.data;
};

export const deleteEstablishment = async (id: string): Promise<void> => {
  await axiosApi.delete(`/establishments/${id}`);
};

export const createReview = async (
  establishmentId: string,
  data: ICreateReview,
): Promise<void> => {
  await axiosApi.post(`/establishments/${establishmentId}/reviews`, data);
};

export const deleteReview = async (
  establishmentId: string,
  reviewId: string,
): Promise<void> => {
  await axiosApi.delete(
    `/establishments/${establishmentId}/reviews/${reviewId}`,
  );
};

export const uploadImage = async (
  establishmentId: string,
  file: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append('url', file);
  await axiosApi.post(`/establishments/${establishmentId}/images`, formData);
};

export const deleteImage = async (
  establishmentId: string,
  imageId: string,
): Promise<void> => {
  await axiosApi.delete(`/establishments/${establishmentId}/images/${imageId}`);
};
