export interface SkillIcon {
  src: string;
  scale: [number, number];
}

interface SkillUrl {
  text: string;
  url: string;
}

export interface Skill {
  title: string;
  date: string;
  subtext?: string;
  icons: SkillIcon[]; 
  url?: string;
  urls?: SkillUrl[];
}