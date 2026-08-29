import raw from "@/content/research.json";

export type ResearchTrack = {
  id: string;
  code: string;
  title: string;
  focus: string;
  description: string;
  /** Published write-ups. Empty until a real article exists. */
  articles: { title: string; url: string; date: string }[];
};

export const researchTracks: ResearchTrack[] = raw;
