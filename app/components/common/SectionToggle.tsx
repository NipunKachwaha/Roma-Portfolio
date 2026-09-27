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
		if (scrollProgress > 0.8 && !isActive) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [scrollProgress, isActive]);

	useGSAP(() => {
		gsap.to(btnRef.current, {
			opacity: isVisible ? 1 : 0,
			pointerEvents: isVisible ? "auto" : "none",
			scale: isVisible ? 1 : 0.8,
			duration: 0.4,
		});
	}, [isVisible]);

	return (
		<button
			ref={btnRef}
			onClick={toggleSection}
			className="fixed bottom-[5rem] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center border border-white/80 text-white/80 hover:text-white hover:border-white hover:scale-105 transition-all duration-300 backdrop-blur-sm"
			style={{
				width: "50px",
				height: "25px",
				opacity: 0,
				pointerEvents: "none",
			}}
		>
			<span className="text-sm pb-1" style={{ fontFamily: "soria" }}>
				↔
			</span>
		</button>
	);
};

export default SectionToggle;
