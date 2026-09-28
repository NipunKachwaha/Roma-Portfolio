import { useEffect } from "react";
import { useScrollStore } from "@stores";

export const useJourneyScroll = (isActive: boolean) => {
	const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

	useEffect(() => {
		if (!isActive) {
			const existing = document.getElementById("journey-custom-scroll");
			if (existing) existing.remove();
			return;
		}

		const mainScrollEl = document.querySelector(
			'div[style*="z-index: 1"]',
		) as HTMLElement | null;
		const savedScrollTop = mainScrollEl
			? mainScrollEl.scrollHeight - mainScrollEl.clientHeight
			: 0;

		const scrollContainer = document.createElement("div");
		scrollContainer.id = "journey-custom-scroll";
		scrollContainer.style.position = "fixed";
		scrollContainer.style.inset = "0";
		scrollContainer.style.zIndex = "5";
		scrollContainer.style.overflowY = "auto";
		scrollContainer.style.overflowX = "hidden";
		scrollContainer.style.overscrollBehavior = "none"; 

		const scrollContent = document.createElement("div");
		scrollContent.style.height = "350vh";
		scrollContent.style.width = "100%";
		scrollContainer.appendChild(scrollContent);
		document.body.appendChild(scrollContainer);

		setScrollProgress(0);

		const handleScroll = (e: Event) => {
			e.stopPropagation();
			if (mainScrollEl && savedScrollTop > 0) {
				mainScrollEl.scrollTop = savedScrollTop;
			}

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

			if (mainScrollEl && savedScrollTop > 0) {
				mainScrollEl.scrollTop = savedScrollTop;
			}
			setScrollProgress(1);
		};
	}, [isActive, setScrollProgress]);
};
