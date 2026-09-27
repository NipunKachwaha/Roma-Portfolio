import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore } from "@stores";
import SkillsCarousel from "./SkillsCarousel";
import { QuillGarden } from "@/app/components/models/QuillGarden";
import { TouchPanControls } from "../../experience/projects/TouchPanControls";

const Skills = () => {
	const { camera } = useThree();
	const isActive = usePortalStore((state) => state.activePortalId === "skills");
	const data = useScroll();
	const gardenRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!data || !data.el) return;
		data.el.style.overflow = isActive ? "hidden" : "auto";

		if (gardenRef.current) {
			gsap.to(gardenRef.current.position, {
				x: isActive ? 2.6 : -2.6,
				duration: 1,
				ease: "power2.inOut",
			});
		}

		if (isActive) {
			if (isMobile) {
				gsap.to(camera.position, { z: 11.5, y: -39, x: 0, duration: 1 });
			} else {
				gsap.to(camera.position, { z: 11.5, y: -39, x: 0, duration: 1 });
			}
		}
	}, [isActive]);

	useFrame((state, delta) => {
		if (isActive && !isMobile) {
			const maxRotation = Math.PI / 20;
			camera.rotation.y = THREE.MathUtils.lerp(
				camera.rotation.y,
				-(state.pointer.x * maxRotation),
				0.03,
			);
			camera.position.z = THREE.MathUtils.damp(
				camera.position.z,
				11.5 - state.pointer.y * 0.5,
				7,
				delta,
			);
		}
	});

	return (
		<group>
			<group ref={gardenRef} position={[4.6, -2.5, -5]}>
				<QuillGarden rotation={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} />
			</group>

			<group position={[4.8, 1.0, 2.0]} scale={[0.82, 0.82, 0.82]}>
				<SkillsCarousel />
			</group>

			{isActive && isMobile && <TouchPanControls />}
		</group>
	);
};

export default Skills;
