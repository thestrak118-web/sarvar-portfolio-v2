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
export const experienceHeading: string = raw.heading;
export const experienceDescription: string = raw.description;

/** NDA yorlig'i faqat haqiqatan maxfiy engagement bo'lsa chiqadi. */
export const hasConfidential = engagements.some((job) => job.confidential);
