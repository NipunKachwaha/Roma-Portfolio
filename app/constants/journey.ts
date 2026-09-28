import * as THREE from "three";
import { JourneyTimelinePoint } from "../types";

export const JOURNEY_TIMELINE: JourneyTimelinePoint[] = [
	{
		point: new THREE.Vector3(-5.2, -0.4, 0.0),
		year: "2024 to 2027",
		title: "Delhi University",
		subtitle: "Bachelor of Arts (BA)",
		position: "right",
	},
	{
		point: new THREE.Vector3(-6.8, -2.8, -9.8),
		year: "2024 to 2027",
		title: "IICS",
		subtitle: "Full Stack Engineering",
		position: "right",
	},
	{
		point: new THREE.Vector3(-1.3, -1.5, -11.4),
		year: "2025 to 2026",
		title: "IICS",
		subtitle: "Digital Marketing",
		position: "left",
	},
	{
		point: new THREE.Vector3(-1.3, -3.5, -7.4),
		year: "In Future, maybe in 2027",
		title: "Manipal University",
		subtitle: "Master of Computer Applications (AI & ML)",
		position: "left",
	},
	{
		point: new THREE.Vector3(2.2, -2.55, -10.0),
		year: "In Future, maybe in 2031",
		title: "MIT / Stanford",
		subtitle: "Ph.D. in Robotics and Artificial Intelligence",
		position: "right",
	},
	{
		point: new THREE.Vector3(2.35, -3.25, -6.5),
		year: "2026",
		title: "Living...",
		subtitle: "Building Next-Gen Web",
		position: "left",
	},
];