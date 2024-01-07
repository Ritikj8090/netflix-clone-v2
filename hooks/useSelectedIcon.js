import { create } from 'zustand';



const useSelectedIcon = create((set) => ({
  isOpen: false,
  openSelected: () => set({isSelected: true}),
  closeSelected: () => set({ isSelected: false }),
}));

export default useSelectedIcon;
