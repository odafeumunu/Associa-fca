import { create } from "zustand";
import type { PlayerFormData } from "@/app/register/schema"; // ✅ Import your schema type

interface FormState {
  step: number;
  data: PlayerFormData;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (values: Partial<PlayerFormData>) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  step: 0,
  data: {} as PlayerFormData,
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  updateData: (values) => set((s) => ({ data: { ...s.data, ...values } })),
  reset: () => set({ step: 0, data: {} as PlayerFormData }),
}));
