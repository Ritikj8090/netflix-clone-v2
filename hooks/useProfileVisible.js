import { create } from 'zustand';



const useProfileVisible = create((set) => ({
  isOpen: false,
  openModal: () => set({isOpen: true}),
  closeModal: () => set({ isOpen: false }),
}));

export default useProfileVisible;
