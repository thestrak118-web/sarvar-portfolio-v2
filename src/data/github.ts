import raw from "@/content/github.json";

export type Repo = {
  name: string;
  description: string;
  language: string;
  tag: string;
  url: string;
  featured: boolean;
};

export const githubUser: string = raw.user;
export const repos: Repo[] = raw.repos;
