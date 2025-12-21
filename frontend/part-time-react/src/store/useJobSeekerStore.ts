import { create } from "zustand";

export interface JobSeekerRegistrationData {
  firstName: string;
  lastName: string;
  nic: string;
  gender: string;
  address: string;
  dob: Date | null;
  bio: string;
  skills: string[];
  profilePicture: File | null;
}

interface EmployerStore {
  data: JobSeekerRegistrationData;
  setData: (newData: Partial<JobSeekerRegistrationData>) => void;
  reset: () => void;
}

export const useJobSeekerStore = create<EmployerStore>((set) => ({
  data: {
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    address: "",
    dob: null,
    bio: "",
    skills: [],
    profilePicture: null,
  },
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () =>
    set({
      data: {
        firstName: "",
        lastName: "",
        nic: "",
        gender: "",
        address: "",
        dob: null,
        bio: "",
        skills: [],
        profilePicture: null,
      },
    }),
}));
