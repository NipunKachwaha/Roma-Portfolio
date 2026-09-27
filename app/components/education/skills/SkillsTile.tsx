import { Edges, Text, TextProps, Image } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Skill } from "@types";

interface SkillTileProps {
	skill: Skill;
	index: number;
	position: [number, number, number];
	rotation: [number, number, number];
	activeId: number | null;
	onClick: () => void;
	datePosition: "top" | "bottom";
}

const SkillTile = ({
	skill,
	index,
	position,
	rotation,
	activeId,
	onClick,
	datePosition,
}: SkillTileProps) => {
	const skillRef = useRef<THREE.Group>(null);
	const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
	const [desktopHovered, setDesktopHovered] = useState(false);
	const isSkillSectionActive = usePortalStore(
		(state) => state.activePortalId === "skills",
	);
	const hovered = isMobile ? activeId === index : desktopHovered;
	const isTop = datePosition === "top";

	const titleProps = useMemo(
		() => ({
			font: "./soria-font.ttf",
			color: "black",
		}),
		[],
	);

	const subtitleProps: Partial<TextProps> = useMemo(
		() => ({
			font: "./Vercetti-Regular.woff",
			color: "black",
			anchorX: "left",
			anchorY: "top",
		}),
		[],
	);

	useEffect(() => {
		if (!skillRef.current) return;
		hoverAnimRef.current?.kill();

		const [mesh, title, dateGroup, iconsGroup, button] =
			skillRef.current.children;

		hoverAnimRef.current = gsap.timeline();
		hoverAnimRef.current
			.to(skillRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
			.to(skillRef.current.position, { y: hovered ? (isTop ? -2 : 0) : 0 }, 0)
			.to(
				skillRef.current.scale,
				{
					x: hovered ? 1.3 : 1,
					y: hovered ? 1.3 : 1,
					z: hovered ? 1.3 : 1,
				},
				0,
			)
			.to(title.position, { y: hovered ? 1.1 : -0.8 }, 0)
			.to(dateGroup.position, { y: hovered ? 2.6 : isTop ? 1.4 : -1.4 }, 0)
			.to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
			.to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
			.to(mesh.position, { y: hovered ? 1 : 0 }, 0)
			.to(iconsGroup.position, { y: hovered ? 0.3 : -1.5 }, 0);

		if (iconsGroup && iconsGroup.children) {
			iconsGroup.children.forEach((iconMesh: any) => {
				if (iconMesh.material) {
					gsap.to(iconMesh.material, {
						opacity: hovered ? 1 : 0,
						duration: 0.4,
					});
				}
			});
		}

		if (skill.url && button) {
			hoverAnimRef.current
				.to(button.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
				.to(button.position, { z: hovered ? 0.3 : -1 }, 0);
		}
	}, [hovered, isTop, skill.url]);

	useEffect(() => {
		if (skillRef.current) {
			gsap.to(skillRef.current.position, {
				y: isSkillSectionActive ? 0 : -11,
				duration: 1,
				delay: isSkillSectionActive ? index * 0.1 : 0,
			});
		}
	}, [isSkillSectionActive, index]);

	const handleClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		if (!skill.url) return;
		const button = e.eventObject;
		gsap
			.to(button.position, { z: 0, duration: 0.1 })
			.then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));
		setTimeout(() => window.open(skill.url, "_blank"), 50);
	};

	const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		if (!isMobile && isSkillSectionActive) {
			setDesktopHovered(true);
		}
	};

	return (
		<group
			position={position}
			rotation={rotation}
			onClick={onClick}
			onPointerOver={handlePointerOver}
			onPointerOut={() =>
				!isMobile && isSkillSectionActive && setDesktopHovered(false)
			}
		>
			<group ref={skillRef}>
				<mesh>
					<planeGeometry args={[4.2, 2, 1]} />
					<meshBasicMaterial color="#FFF" transparent opacity={0.3} />
					<Edges color="black" lineWidth={1.5} />
				</mesh>

				<Text
					{...titleProps}
					position={[-1.9, -0.8, 0.101]}
					anchorX="left"
					anchorY="bottom"
					maxWidth={4}
					fontSize={0.65}
				>
					{skill.title}
				</Text>

				<group position={[-0.6, 1.4, 0.1]}>
					<mesh>
						<boxGeometry args={[3.0, 0.5, 0.25]} />
						<meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
						<Edges color="black" lineWidth={2} />
					</mesh>
					<Text
						{...subtitleProps}
						anchorX="center"
						anchorY="middle"
						position={[0, 0, 0.13]}
						fontSize={0.22}
					>
						{skill.date.toUpperCase()}
					</Text>
				</group>

				<group position={[-1.6, -0.85, 0.1]}>
					{skill.icons?.map((icon, idx) => {
						const row = Math.floor(idx / 5);
						const col = idx % 5;
						return (
							<Image
								key={idx}
								url={icon.src}
								position={[col * 0.8, -row * 0.75, 0]}
								scale={icon.scale}
								transparent
								opacity={0}
								renderOrder={1}
								material-alphaTest={0.1}
							/>
						);
					})}
				</group>

				{skill.url && (
					<group
						position={[1.3, -0.6, -1]}
						scale={[0, 0, 1]}
						onClick={handleClick}
						onPointerOver={() => (document.body.style.cursor = "pointer")}
						onPointerOut={() => (document.body.style.cursor = "auto")}
					>
						<mesh>
							<boxGeometry args={[1.1, 0.4, 0.2]} />
							<meshBasicMaterial color="#222" />
							<Edges color="white" lineWidth={1} />
						</mesh>
						<Text
							{...subtitleProps}
							color="white"
							position={[-0.4, 0.15, 0.2]}
							fontSize={0.25}
						>
							VIEW ↗
						</Text>
					</group>
				)}
			</group>
		</group>
	);
};

export default SkillTile;
