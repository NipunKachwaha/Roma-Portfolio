import { Box, Edges, Line, Text, TextProps } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { JOURNEY_TIMELINE } from "@constants";
import { JourneyTimelinePoint } from "@types";

const reusableLeft = new THREE.Vector3(-0.3, 0, -0.1);
const reusableRight = new THREE.Vector3(0.3, 0, -0.1);

// Starting Point (progress = 0) Front-Center Full Model Camera Settings:
const START_CAM_X = -0.35; // Front-Center (Left/Right)
const START_CAM_Y = -36.2; // Full Model Zoom-Out Depth (-35.5 aur door, -37.0 aur paas)
const START_CAM_Z = 14.1;  // Front-Center Height (Up/Down)

const TimelinePoint = ({
	point,
	diff,
}: {
	point: JourneyTimelinePoint;
	diff: number;
}) => {
	const getPoint = useMemo(() => {
		switch (point.position) {
			case "left":
				return reusableLeft;
			case "right":
				return reusableRight;
			default:
				return new THREE.Vector3();
		}
	}, [point.position]);

	const textAlign = point.position === "left" ? "right" : "left";
	const opacity = Math.max(0, Math.min(1, 2 - 2 * diff));

	const textProps: Partial<TextProps> = useMemo(
		() => ({
			font: "./Vercetti-Regular.woff",
			color: "white",
			outlineWidth: 0.02,
			outlineColor: "#111111",
			anchorX: textAlign,
			fillOpacity: opacity,
			outlineOpacity: opacity,
		}),
		[textAlign, opacity],
	);

	const titleProps = useMemo(
		() => ({
			...textProps,
			font: "./soria-font.ttf",
			fontSize: 0.55,
			maxWidth: 2.8,
		}),
		[textProps],
	);

	const s = Math.max(0.001, 1 - diff);

	return (
		<group position={point.point} scale={isMobile ? 0.35 : 0.55}>
			<Box
				args={[0.2, 0.2, 0.2]}
				position={[0, 0, -0.1]}
				scale={[s, s, s]}
			>
				<meshBasicMaterial color="white" wireframe />
				<Edges color="white" lineWidth={1.5} />
			</Box>
			<group>
				<group position={getPoint}>
					<Text {...textProps} fontSize={0.28} position={[-diff / 2, 0, 0]}>
						{point.year}
					</Text>
					<group position={[0, -0.48, 0]}>
						<Text {...titleProps} position={[0, -diff / 2, 0]}>
							{point.title}
						</Text>
						{point.subtitle && (
							<Text
								{...textProps}
								fontSize={0.19}
								position={[0, -0.4 - diff, 0]}
							>
								{point.subtitle}
							</Text>
						)}
					</group>
				</group>
			</group>
		</group>
	);
};

const JourneyTimeline = ({ progress }: { progress: number }) => {
	const { camera } = useThree();
	const isActive = usePortalStore(
		(state) => state.activePortalId === "journey",
	);
	const timeline = useMemo(() => JOURNEY_TIMELINE, []);

	const curve = useMemo(
		() => new THREE.CatmullRomCurve3(timeline.map((p) => p.point), false),
		[timeline],
	);
	const curvePoints = useMemo(() => curve.getPoints(500), [curve]);
	const visibleCurvePoints = useMemo(
		() =>
			curvePoints.slice(
				0,
				Math.max(1, Math.ceil(progress * curvePoints.length)),
			),
		[curvePoints, progress],
	);
	const visibleTimelinePoints = useMemo(
		() =>
			timeline.slice(
				0,
				Math.max(1, Math.round(progress * (timeline.length - 1) + 1)),
			),
		[timeline, progress],
	);

	const [visibleDashedCurvePoints, setVisibleDashedCurvePoints] = useState<
		THREE.Vector3[]
	>([]);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useFrame((_, delta) => {
		if (isActive) {
			const position = curve.getPoint(progress);

			const scrollBlend = Math.min(progress * 4.5, 1);

			const followX = (isMobile ? -0.3 : -0.5) + position.x * 0.65;
			const followY = -38.8 + position.z * 0.85;
			const followZ = 13.4 - position.y * 0.6;

			const targetX = THREE.MathUtils.lerp(START_CAM_X, followX, scrollBlend);
			const targetY = THREE.MathUtils.lerp(START_CAM_Y, followY, scrollBlend);
			const targetZ = THREE.MathUtils.lerp(START_CAM_Z, followZ, scrollBlend);

			camera.position.x = THREE.MathUtils.damp(
				camera.position.x,
				targetX,
				4,
				delta,
			);
			camera.position.y = THREE.MathUtils.damp(
				camera.position.y,
				targetY,
				4,
				delta,
			);
			camera.position.z = THREE.MathUtils.damp(
				camera.position.z,
				targetZ,
				4,
				delta,
			);

			camera.rotation.x = THREE.MathUtils.damp(
				camera.rotation.x,
				-Math.PI / 2,
				4,
				delta,
			);
			camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, 0, 4, delta);
			camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, 0, 4, delta);
		}
	});

	const groupRef = useRef<THREE.Group>(null);

	useEffect(() => {
		const tl = gsap.timeline();
		if (groupRef.current) {
			tl.to(groupRef.current.scale, {
				x: isActive ? 1 : 0,
				y: isActive ? 1 : 0,
				z: isActive ? 1 : 0,
				duration: 1,
				delay: isActive ? 0.4 : 0,
			});
			tl.to(
				groupRef.current.position,
				{
					y: isActive ? 0 : -2,
					duration: 1,
					delay: isActive ? 0.4 : 0,
				},
				0,
			);
		}

		if (isActive) {
			let i = 0;
			clearInterval(intervalRef.current!);
			setTimeout(() => {
				intervalRef.current = setInterval(() => {
					const p = i++ / 100;
					setVisibleDashedCurvePoints(
						curvePoints.slice(
							0,
							Math.max(1, Math.ceil(p * curvePoints.length)),
						),
					);
					if (i > 100 && intervalRef.current)
						clearInterval(intervalRef.current);
				}, 10);
			}, 1000);
		} else {
			setVisibleDashedCurvePoints([]);
			clearInterval(intervalRef.current!);
		}

		return () => clearInterval(intervalRef.current!);
	}, [isActive, curvePoints]);

	return (
		<group position={[0, -0.1, -0.1]}>
			<Line points={visibleCurvePoints} color="white" lineWidth={3} />
			{visibleDashedCurvePoints.length > 0 && (
				<Line
					points={visibleDashedCurvePoints}
					color="white"
					lineWidth={0.5}
					dashed
					dashSize={0.25}
					gapSize={0.25}
				/>
			)}
			<group ref={groupRef}>
				{visibleTimelinePoints.map((point, i) => {
					const diff =
						i === 0
							? Math.max(0, 1 - progress * 20)
							: Math.min(
									2 * Math.max(i - progress * (timeline.length - 1), 0),
									1,
								);
					return <TimelinePoint point={point} key={i} diff={diff} />;
				})}
			</group>
		</group>
	);
};

export default JourneyTimeline;