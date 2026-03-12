import { create } from 'zustand';

const useStore = create((set) => ({
  // Scroll
  scrollProgress: 0,
  setScrollProgress: (val) => set({ scrollProgress: val }),

  // Section index (0–5)
  currentSection: 0,
  setCurrentSection: (val) => set({ currentSection: val }),

  // Loading
  isLoading: true,
  setIsLoading: (val) => set({ isLoading: val }),

  // Custom cursor — dot (instant)
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (val) => set({ cursorPos: val }),

  // Custom cursor — ring (lerped)
  cursorRingPos: { x: 0, y: 0 },
  setCursorRingPos: (val) => set({ cursorRingPos: val }),
}));

export default useStore;
