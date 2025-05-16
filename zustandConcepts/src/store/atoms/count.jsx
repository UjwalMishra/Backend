import { create } from "zustand";
import { persist } from "zustand/middleware";
const useCount = create(
  persist(
    (set) => ({
      //initial val
      count: 0,
      //fxns
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "countStorage",
    }
  )
);

export default useCount;
