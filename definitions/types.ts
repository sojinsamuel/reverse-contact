import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DatabaseRecord {
  email: string;
  recipientId: string;
}

interface LineTypeIntelligence {
  carrier_name: string;
  error_code: string | null;
  mobile_country_code: string;
  mobile_network_code: string;
  type: string;
}

export interface PhoneDetailsI {
  callingCountryCode: string;
  countryCode: string;
  phoneNumber: string;
  nationalFormat: string;
  valid: boolean;
  validationErrors: string[];
  callerName: string | null;
  simSwap: string | null;
  callForwarding: string | null;
  lineStatus: string | null;
  lineTypeIntelligence: LineTypeIntelligence;
  identityMatch: string | null;
  reassignedNumber: string | null;
  smsPumpingRisk: string | null;
  phoneNumberQualityScore: string | null;
  preFill: string | null;
  url: string;
}

export interface UserI {
  name: string;
  email: string;
  picture: string;
  sub: string;
  sid: string;
  amr: Array<string>;
  email_verified: boolean;
  updated_at: string;
  family_name: string;
  nickname: string;
  acr: string;
  given_name: string;
}

export interface FormDataI {
  email: string;
  message: string;
  subject: string;
}

export interface FetchFailed {
  person: null;
  company: null;
  error: string;
}

export interface EmailLookupResponse {
  success: boolean;
  email: string;
  emailType: string;
  credits_left: number;
  rate_limit_left: number;
  person: Person;
  company: Company;
}

interface Person {
  publicIdentifier: string;
  linkedInIdentifier: string;
  linkedInUrl: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  summary: string;
  photoUrl: string;
  creationDate: DatePartial;
  followerCount: number;
  positions: Positions;
  schools: Schools;
  skills: Array<string>;
  languages: Array<string>;
}

interface DatePartial {
  month?: number;
  year: number;
}

interface Positions {
  positionsCount: number;
  positionHistory: PositionHistory[];
}

interface PositionHistory {
  title: string;
  companyName: string;
  description: string;
  startEndDate: DateRange;
  companyLogo: string;
  linkedInUrl: string;
  linkedInId: string;
}

interface DateRange {
  start: DatePartial;
  end?: DatePartial;
}

interface Schools {
  educationsCount: number;
  educationHistory: EducationHistory[];
}

interface EducationHistory {
  degreeName: string;
  fieldOfStudy: string;
  description?: string;
  linkedInUrl: string;
  schoolLogo: string;
  schoolName: string;
  startEndDate: DateRange;
}

interface Company {
  linkedInId: string;
  name: string;
  universalName: string;
  linkedInUrl: string;
  employeeCount: number;
  websiteUrl: string;
  tagline?: string;
  description: string;
  industry: string;
  phone?: string;
  specialities: string[];
  headquarter: Headquarters;
  logo: string;
}

interface Headquarters {
  city: string;
  country: string;
  postalCode: string;
  geographicArea: string;
}
