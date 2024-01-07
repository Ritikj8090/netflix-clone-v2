import { create } from 'zustand';



const useChoiceProfileIcon = create((set) => ({
  isOpen: false,
  openIcon: () => set({isIcon: true}),
  closeIcon: () => set({ isIcon: false }),
}));

export default useChoiceProfileIcon;
