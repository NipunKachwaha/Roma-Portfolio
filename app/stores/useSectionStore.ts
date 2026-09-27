import { create } from "zustand";

interface SectionState {
	activeSection: "experience" | "education";
	toggleSection: () => void;
}

export const useSectionStore = create<SectionState>((set) => ({
	activeSection: "experience",
	toggleSection: () =>
		set((state) => ({
			activeSection:
				state.activeSection === "experience" ? "education" : "experience",
		})),
}));
