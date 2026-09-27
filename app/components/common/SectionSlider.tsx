import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Education from "../education";
import Experience from "../experience";
import { useSectionStore } from "@/app/stores/useSectionStore"; 

const SectionSlider = () => {
	const pivotRef = useRef<THREE.Group>(null);
	const activeSection = useSectionStore((state) => state.activeSection);

	useEffect(() => {
		if (!pivotRef.current) return;
		gsap.to(pivotRef.current.rotation, {
			y: activeSection === "education" ? -Math.PI / 2 : 0,
			duration: 1.2,
			ease: "power3.inOut",
		});
	}, [activeSection]);

	const D = 6;

	return (
		<group position={[0, -41.5, 12]}>
			{/* MAIN 3D CONTAINER */}
			<group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
				<group position={[0, 0, -D]} ref={pivotRef}>
					
					{/* Experience Section */}
					<group position={[0, 0, D]}>
						<Experience />
					</group>

					{/* Education Section */}
					<group position={[D, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
						<Education />
					</group>
					
				</group>
			</group>
		</group>
	);
};

export default SectionSlider;