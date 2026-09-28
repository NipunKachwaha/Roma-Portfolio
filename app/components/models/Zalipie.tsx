import React, { JSX, useEffect } from "react";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Zalipie(props: JSX.IntrinsicElements["group"]) {
	const { scene } = useGLTF("/models/journey_interior.glb");

	useEffect(() => {
		scene.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				const oldMat = mesh.material as THREE.MeshStandardMaterial;
				if (oldMat && oldMat.map) {
					mesh.material = new THREE.MeshBasicMaterial({
						map: oldMat.map,
						side: THREE.DoubleSide,
						fog: false, 
					});
				}
			}
		});
	}, [scene]);

	return (
		<group {...props} dispose={null}>
			<Center>
				<primitive object={scene} />
			</Center>
		</group>
	);
}

useGLTF.preload("/models/journey_interior.glb");