import { useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import SkillTile from "./SkillsTile";

import { SKILLS_DATA } from "@constants";
import { usePortalStore } from "@stores";

const SkillsCarousel = () => {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const isActive = usePortalStore((state) => state.activePortalId === "skills");
	const activeId = isActive ? selectedId : null;

	const onClick = (id: number) => {
		if (!isMobile) return;
		setSelectedId(id === selectedId ? null : id);
	};

	const tiles = useMemo(() => {
		const fov = Math.PI * 0.52; 
		const distance = 13.5; 

		const columns = Math.ceil(SKILLS_DATA.length / 2);
		const centerColumn = (columns - 1) / 2; 

		return SKILLS_DATA.map((skill, i) => {
			const row = i % 2; 
			const column = Math.floor(i / 2);

			const angle = Math.PI / 2 + (column - centerColumn) * (fov / columns);

			const z = -distance * Math.sin(angle);
			const x = -distance * Math.cos(angle);

			const rotY = Math.PI / 2 - angle;

			// vertical stacking
			const y = row === 0 ? 3.25 : 1;
			const datePosition = row === 0 ? "top" : "bottom";

			return (
				<SkillTile
					key={i}
					datePosition={datePosition}
					skill={skill}
					index={i}
					position={[x, y, z]}
					rotation={[0, rotY, 0]}
					activeId={activeId}
					onClick={() => onClick(i)}
				/>
			);
		});
	}, [activeId, isActive]);

	const centerX = -2.85;

	return (
		<group position={[centerX, 0, 0]} rotation={[0, 0, 0]}>
			{tiles}
		</group>
	);
};

export default SkillsCarousel;
