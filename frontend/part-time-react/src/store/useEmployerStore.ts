import { create } from "zustand";

export interface EmployerRegistrationData {
  companyName: string;
  registrationID: string;
  contactPerson: string;
  phone: string;
  address: string;
  industry: string;
  website: string;
  description: string;
  logo: File | null;
}

interface EmployerStore {
  data: EmployerRegistrationData;
  setData: (newData: Partial<EmployerRegistrationData>) => void;
  reset: () => void;
}

export const useEmployerStore = create<EmployerStore>((set) => ({
  data: {
    companyName: "",
    registrationID: "",
    contactPerson: "",
    phone: "",
    address: "",
    industry: "",
    website: "",
    description: "",
    logo: null,
  },
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () =>
    set({
      data: {
        companyName: "",
        registrationID: "",
        contactPerson: "",
        phone: "",
        address: "",
        industry: "",
        website: "",
        description: "",
        logo: null,
      },
    }),
}));
