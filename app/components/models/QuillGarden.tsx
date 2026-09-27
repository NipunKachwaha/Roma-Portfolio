import React, { JSX } from "react";
import { useGLTF } from "@react-three/drei";

export function QuillGarden(props: JSX.IntrinsicElements["group"]) {
	const { scene } = useGLTF("/models/quill_garden_gateway.glb");

	return (
		<group {...props} dispose={null}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload("/models/quill_garden_gateway.glb");
