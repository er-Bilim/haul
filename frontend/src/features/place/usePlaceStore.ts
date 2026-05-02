import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  IEstablishment,
  ICreateEstablishment,
  ICreateReview,
} from '@/types/establishment.types';
import type { IGlobalError } from '@/types/error.types';
import { parseApiError } from '@/utils/parseApiError';
import { toast } from 'react-toastify';
import {
  getAll,
  getById,
  createEstablishment,
  deleteEstablishment,
  createReview,
  deleteReview,
  uploadImage,
  deleteImage,
} from './service/establishment.service';

interface IEstablishmentState {
  establishments: IEstablishment[];
  currentEstablishment: IEstablishment | null;

  fetchAllLoading: boolean;
  fetchAllError: IGlobalError | null;
  fetchOneLoading: boolean;
  fetchOneError: IGlobalError | null;
  createLoading: boolean;
  createError: IGlobalError | null;
  deleteLoading: boolean;
  reviewLoading: boolean;
  imageLoading: boolean;

  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  create: (data: ICreateEstablishment) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addReview: (establishmentId: string, data: ICreateReview) => Promise<void>;
  removeReview: (establishmentId: string, reviewId: string) => Promise<void>;
  addImage: (establishmentId: string, file: File) => Promise<void>;
  removeImage: (establishmentId: string, imageId: string) => Promise<void>;
}

export const useEstablishmentStore = create<IEstablishmentState>()(
  devtools(
    (set) => ({
      establishments: [],
      currentEstablishment: null,
      fetchAllLoading: false,
      fetchAllError: null,
      fetchOneLoading: false,
      fetchOneError: null,
      createLoading: false,
      createError: null,
      deleteLoading: false,
      reviewLoading: false,
      imageLoading: false,

      fetchAll: async () => {
        set({ fetchAllLoading: true, fetchAllError: null });
        try {
          const establishments = await getAll();
          set({ establishments, fetchAllLoading: false });
        } catch (error) {
          set({
            fetchAllLoading: false,
            fetchAllError: parseApiError(error as IGlobalError),
          });
          throw error;
        }
      },

      fetchOne: async (id) => {
        set({ fetchOneLoading: true, fetchOneError: null });
        try {
          const establishment = await getById(id);
          set({ currentEstablishment: establishment, fetchOneLoading: false });
        } catch (error) {
          set({
            fetchOneLoading: false,
            fetchOneError: parseApiError(error as IGlobalError),
          });
          throw error;
        }
      },

      create: async (data) => {
        set({ createLoading: true, createError: null });
        try {
          const establishment = await createEstablishment(data);
          set((state) => ({
            establishments: [...state.establishments, establishment],
            createLoading: false,
          }));
          toast.success('Establishment created!');
        } catch (error) {
          set({
            createLoading: false,
            createError: parseApiError(error as IGlobalError),
          });
          throw error;
        }
      },

      remove: async (id) => {
        set({ deleteLoading: true });
        try {
          await deleteEstablishment(id);
          set((state) => ({
            establishments: state.establishments.filter((e) => e._id !== id),
            deleteLoading: false,
          }));
          toast.success('Establishment deleted!');
        } catch (error) {
          set({ deleteLoading: false });
          throw error;
        }
      },

      addReview: async (establishmentId, data) => {
        set({ reviewLoading: true });
        try {
          await createReview(establishmentId, data);
          const establishment = await getById(establishmentId);
          set({ currentEstablishment: establishment, reviewLoading: false });
          toast.success('Review accepted');
        } catch (error) {
          set({ reviewLoading: false });
          throw error;
        }
      },

      removeReview: async (establishmentId, reviewId) => {
        set({ reviewLoading: true });
        try {
          await deleteReview(establishmentId, reviewId);
          const establishment = await getById(establishmentId);
          set({ currentEstablishment: establishment, reviewLoading: false });
          toast.success('Review deleted!');
        } catch (error) {
          set({ reviewLoading: false });
          throw error;
        }
      },

      addImage: async (establishmentId, file) => {
        set({ imageLoading: true });
        try {
          await uploadImage(establishmentId, file);
          const establishment = await getById(establishmentId);
          set({ currentEstablishment: establishment, imageLoading: false });
          toast.success('Image created!');
        } catch (error) {
          set({ imageLoading: false });
          throw error;
        }
      },

      removeImage: async (establishmentId, imageId) => {
        set({ imageLoading: true });
        try {
          await deleteImage(establishmentId, imageId);
          const establishment = await getById(establishmentId);
          set({ currentEstablishment: establishment, imageLoading: false });
          toast.success('Image deleted!');
        } catch (error) {
          set({ imageLoading: false });
          throw error;
        }
      },
    }),
    { name: 'establishmentStore', enabled: true },
  ),
);
