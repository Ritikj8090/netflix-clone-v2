import { create } from 'zustand';



const useLoading = create((set) => ({
  loading: false,
  openLoading: () => set({loading: true}),
  closeLoading: () => set({loading: false}),

}));

export default useLoading;
