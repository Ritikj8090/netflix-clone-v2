import { create } from 'zustand';



const SelectedProfile = create((set) => ({
  Name: '',
  Img: '',
  Selected: '',
  UpdatedName: '',
  Exchange: '',
  selectedName: (name) => set({Name: name}),
  selectedImg: (img) => set({Img: img}),
  selectedIcon: (icon) => set({Selected: icon}),
  UpdateName: (update) => set({UpdatedName: update}),
  ExchangeIcon: (icon) => set({Exchange: icon}),
}));

export default SelectedProfile;
