import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2024',
    title: 'IICS GTB Nagar',
    subtitle: 'Full-Stack Engineering',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2025',
    title: 'IICS GTB Nagar',
    subtitle: 'Digital Marketing Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2026',
    title: 'Commonwealth Bank',
    subtitle: 'Software Developer Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2026',
    title: 'Electronic Arts (EA)',
    subtitle: 'Software Engineer Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: 'Living...',
    subtitle: '↓ 128K tokens',
    position: 'right',
  }
]