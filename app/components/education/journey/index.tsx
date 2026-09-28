import { usePortalStore, useScrollStore } from "@stores";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Zalipie } from "@/app/components/models/Zalipie";
import JourneyTimeline from "./JourneyTimeline";
import { useJourneyScroll } from "./useJourneyScroll";

const Journey = () => {
	const isActive = usePortalStore(
		(state) => state.activePortalId === "journey",
	);
	const scrollProgress = useScrollStore((state) => state.scrollProgress);
	const modelRef = useRef<THREE.Group>(null);

	useJourneyScroll(isActive);

	useEffect(() => {
		if (modelRef.current) {
			gsap.to(modelRef.current.position, {
				x: isActive ? -1.9 : -1.9,
				y: isActive ? -1.1 : -1.1,
				z: isActive ? -6.8 : -8.5,
				duration: 1,
				ease: "power2.inOut",
			});
		}
	}, [isActive]);

	return (
		<group>
			<mesh receiveShadow>
				<planeGeometry args={[4, 4, 1]} />
				<shadowMaterial opacity={0.1} />
			</mesh>
			<group ref={modelRef} position={[-1.9, -1.1, -8.5]}>
				<Zalipie
					scale={new THREE.Vector3(0.5, 0.5, 0.72)}
					rotation={[0, 0, 0]}
				/>
			</group>
			<JourneyTimeline progress={isActive ? scrollProgress : 0} />
		</group>
	);
};

export default Journey;