import raw from "@/content/skills.json";

export type Capability = {
  name: string;
  /** Kichik badge'larda chiqadigan tool va texnikalar. */
  tools: string[];
};

export type SkillCategory = {
  id: string;
  code: string;
  name: string;
  caption: string;
  capabilities: Capability[];
};

export type MethodologyStep = { name: string; detail: string };

export const skillsTitle: string = raw.title;
export const skillsSubtitle: string = raw.subtitle;
export const skillCategories: SkillCategory[] = raw.categories;

export const methodology: {
  title: string;
  caption: string;
  steps: MethodologyStep[];
} = raw.methodology;

/** Badge'lardagi takrorlarni hisobga olmagan holdagi umumiy son. */
export const capabilityCount = skillCategories.reduce(
  (total, category) => total + category.capabilities.length,
  0,
);
