import raw from "@/content/experience.json";

export type Engagement = {
  organisation: string;
  /** true when the organisation name is a placeholder awaiting real data */
  organisationPending: boolean;
  role: string;
  period: string;
  periodPending: boolean;
  mode: string;
  confidential: boolean;
  summary: string;
  areas: { title: string; detail: string }[];
};

export const engagements: Engagement[] = raw.engagements;
export const engagementNote: string = raw.note;
