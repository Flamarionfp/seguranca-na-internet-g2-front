import { Dictionary } from "lodash";

interface Person {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  web_address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  person_id: string;
  person: Person;
}

export type ListResumesResponse = Resume[];

export type ResumePreview = Pick<Person, "id" | "name" | "email" | "createdAt">;

export type GroupedResumePreview = Dictionary<ResumePreview[]>;
