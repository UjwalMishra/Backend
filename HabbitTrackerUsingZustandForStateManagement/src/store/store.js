import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserHabit = create(
  persist((set) => ({
    habbits: [],
    setHabbit: (name, freq) =>
      set((state) => ({
        habbits: [
          ...state.habbits,
          {
            id: Date.now().toString(),
            name: name,
            frequency: freq,
            completeDates: [],
            createdAt: Date.now().toString(),
          },
        ],
      })),
  }))
);
