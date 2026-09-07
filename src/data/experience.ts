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
  /** yorliqlar — kontentdan keladi, komponentda qattiq yozilmaydi */
  tags?: string[];
};

export const engagements: Engagement[] = raw.engagements;

/** "Hozirgi" yorlig'i faqat davri hali tugamagan engagement uchun. */
export function isOngoing(job: Engagement): boolean {
  return /hozirgacha|hozirgi|present/i.test(job.period);
}
export const engagementNote: string = raw.note;
export const experienceHeading: string = raw.heading;
export const experienceDescription: string = raw.description;

/** NDA yorlig'i faqat haqiqatan maxfiy engagement bo'lsa chiqadi. */
export const hasConfidential = engagements.some((job) => job.confidential);
