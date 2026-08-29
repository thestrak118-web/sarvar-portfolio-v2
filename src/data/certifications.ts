import raw from "@/content/certifications.json";

export type Certification = {
  name: string;
  abbr: string;
  issuer: string;
  status: "earned" | "roadmap";
  /** Date printed on the certificate. Empty when not supplied. */
  earned: string;
  /** Only rendered when explicitly set — never inferred. */
  credentialId: string;
  verifyUrl: string;
  summary: string;
  domains: string[];
};

type EarnedRecord = Omit<Certification, "status">;

export const certifications: Certification[] = (raw.earned as EarnedRecord[]).map((cert) => ({
  ...cert,
  status: "earned" as const,
}));

/**
 * Next certifications. `pursuing` is only true where Sarvar has stated it
 * himself — the UI prints "Currently pursuing" from this flag alone.
 */
export const certificationRoadmap: {
  abbr: string;
  name: string;
  issuer: string;
  pursuing: boolean;
}[] = raw.roadmap;
