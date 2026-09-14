import { create } from 'zustand';

export const useQuoteModalStore = create((set) => ({
  isOpen: false,
  preselectedProduct: '',
  openModal: (product = '') => set({ isOpen: true, preselectedProduct: product }),
  closeModal: () => set({ isOpen: false, preselectedProduct: '' }),
}));
