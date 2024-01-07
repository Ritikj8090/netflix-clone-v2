import { create } from 'zustand';



const useManageProfile = create((set) => ({
  isOpen: false,
  openModal: () => set({isOpen: true}),
  closeModal: () => set({ isOpen: false }),
}));

export default useManageProfile;
