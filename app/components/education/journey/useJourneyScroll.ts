import { useEffect } from "react";
import { useScrollStore } from "@stores";

export const useJourneyScroll = (isActive: boolean) => {
	const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

	useEffect(() => {
		const mainScrollWrapper = document.querySelector(
			'div[style*="z-index: 1"]',
		) as HTMLElement | null;

		if (!isActive) {
			const existing = document.getElementById("journey-custom-scroll");
			if (existing) existing.remove();

			if (mainScrollWrapper) {
				mainScrollWrapper.style.zIndex = "1";
				mainScrollWrapper.style.overflow = "auto";
			}
			setScrollProgress(0);
			return;
		}

		if (mainScrollWrapper) {
			mainScrollWrapper.style.zIndex = "-1";
			mainScrollWrapper.style.overflow = "hidden";
		}

		const scrollContainer = document.createElement("div");
		scrollContainer.id = "journey-custom-scroll";
		scrollContainer.style.position = "fixed";
		scrollContainer.style.inset = "0";
		scrollContainer.style.zIndex = "5"; 
		scrollContainer.style.overflowY = "auto";
		scrollContainer.style.overflowX = "hidden";

		const scrollContent = document.createElement("div");
		scrollContent.style.height = "350vh"; 
		scrollContent.style.width = "100%";
		scrollContainer.appendChild(scrollContent);
		document.body.appendChild(scrollContainer);

		setScrollProgress(0);

		const handleScroll = () => {
			const maxScroll =
				scrollContainer.scrollHeight - scrollContainer.clientHeight;
			if (maxScroll <= 0) return;
			const progress = Math.min(
				Math.max(scrollContainer.scrollTop / maxScroll, 0),
				1,
			);
			setScrollProgress(progress);
		};

		scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			scrollContainer.removeEventListener("scroll", handleScroll);
			scrollContainer.remove();
			if (mainScrollWrapper) {
				mainScrollWrapper.style.zIndex = "1";
				mainScrollWrapper.style.overflow = "auto";
			}
		};
	}, [isActive, setScrollProgress]);
};
