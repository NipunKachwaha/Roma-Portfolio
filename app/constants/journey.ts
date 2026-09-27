import * as THREE from "three";
import { WorkTimelinePoint } from "@types";

export const EDUCATION_TIMELINE: WorkTimelinePoint[] = [
	{
		year: "Q1 2026",
		title: "Google Cloud Gen AI Academy",
		subtitle: "Cohort-based program on AI agents and data integration",
		position: "left",
		point: new THREE.Vector3(0, 0, 0),
	},
	{
		year: "2020 - 2024",
		title: "B.Tech Computer Science",
		subtitle: "University Name",
		position: "right",
		point: new THREE.Vector3(3, -5, 5),
	},
	{
		year: "2018 - 2020",
		title: "High School",
		subtitle: "Board of Education",
		position: "left",
		point: new THREE.Vector3(-3, -10, 10),
	},
];
