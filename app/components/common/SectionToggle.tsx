"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { usePortalStore, useScrollStore } from "@stores";
import { useSectionStore } from "@/app/stores/useSectionStore";

const SectionToggle = () => {
	const toggleSection = useSectionStore((state) => state.toggleSection);
	const isActive = usePortalStore((state) => state.activePortalId);
	const scrollProgress = useScrollStore((state) => state.scrollProgress);
	const btnRef = useRef<HTMLButtonElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (scrollProgress > 0.95 && !isActive) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [scrollProgress, isActive]);

	useGSAP(() => {
		if (!btnRef.current) return;
		gsap.to(btnRef.current, {
			xPercent: -50,
			opacity: isVisible ? 1 : 0,
			pointerEvents: isVisible ? "auto" : "none",
			scale: isVisible ? 1 : 0.8,
			duration: 0.4,
			ease: "power2.out",
		});
	}, [isVisible]);

	const handleToggle = () => {
		const mainScrollEl = document.querySelector(
			'div[style*="z-index: 1"]',
		) as HTMLElement | null;
		if (mainScrollEl) {
			mainScrollEl.scrollTop = mainScrollEl.scrollHeight;
		}
		toggleSection();
	};

	return (
		<button
			ref={btnRef}
			onClick={handleToggle}
			className="fixed bottom-[13vh] left-1/2 z-10 flex items-center justify-center border border-white/80 text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm cursor-pointer"
			style={{
				width: "54px",
				height: "28px",
				opacity: 0,
				pointerEvents: "none",
				transform: "translateX(-50%) scale(0.8)",
			}}
		>
			<span
				className="text-base leading-none pb-0.5"
				style={{ fontFamily: "soria" }}
			>
				↔
			</span>
		</button>
	);
};

export default SectionToggle;
