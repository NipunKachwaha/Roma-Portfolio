import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import GridTile from "../common/GridTile"; 
import Skills from "./skills";
import Journey from "./journey";

const Education = () => {
	const titleRef = useRef<THREE.Group>(null);
	const groupRef = useRef<THREE.Group>(null);
	const data = useScroll();
	const isActive = usePortalStore((state) => !!state.activePortalId);

	const fontProps = {
		font: "./soria-font.ttf",
		fontSize: 0.4,
		color: "white",
	};

	useFrame((state, delta) => {
		if (!data) return;
		const d = data.range(0.8, 0.2);
		const e = data.range(0.7, 0.2);

		if (groupRef.current && !isActive) {
			groupRef.current.position.y = d > 0 ? -1 : -30;
			groupRef.current.visible = d > 0;
		}

		if (titleRef.current) {
			titleRef.current.children.forEach((text, i) => {
				const y = Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
				text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
				/* eslint-disable  @typescript-eslint/no-explicit-any */
				(text as any).fillOpacity = e;
			});
		}
	});

	const getTitle = () => {
		const title = "education".toUpperCase();
		return title.split("").map((char, i) => {
			const diff = isMobile ? 0.4 : 0.8;
			return (
				<Text key={i} {...fontProps} position={[i * diff, 2, 1]}>
					{char}
				</Text>
			);
		});
	};

	return (
		<group>
			<group rotation={[0, 0, Math.PI / 2]}>
				<group ref={titleRef} position={[isMobile ? -1.8 : -3.6, 2, -2]}>
					{getTitle()}
				</group>

				<group position={[0, -1, 0]} ref={groupRef}>
					<GridTile
						title="MY SKILLS"
						id="skills"
						color="#e3cda4"
						textAlign="left"
						position={new THREE.Vector3(isMobile ? -1 : -2, 0, isMobile ? 0.4 : 0)}
					>
						<Skills />
					</GridTile>

					<GridTile
						title="ACADEMIC JOURNEY"
						id="journey"
						color="#cde3a4"
						textAlign="right"
						position={new THREE.Vector3(isMobile ? 1 : 2, 0, 0)}
					>
						<Journey />
					</GridTile>
				</group>
			</group>
		</group>
	);
};

export default Education;
