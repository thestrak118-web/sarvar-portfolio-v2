import raw from "@/content/skills.json";

export type SkillGroup = {
  id: string;
  name: string;
  code: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = raw;
