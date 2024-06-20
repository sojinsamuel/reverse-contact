import { EmailLookupResponse, FetchFailed } from "@/definitions/types";
import data from "@/lib/data.json";

const ENDPOINT = "https://api.reversecontact.com/enrichment";

export async function getDetailsWithEmail(
  email: string
): Promise<EmailLookupResponse | null | any> {
  try {
    if (process.env.NODE_ENV === "development") {
      return data;
    }
    const res = await fetch(
      `${ENDPOINT}?apikey=${
        process.env.REVERSE_CONTACT_LOOKUP
      }&email=${encodeURIComponent(email)}`
    );
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function trimText(text: string, maxLength = 100) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  } else {
    return text;
  }
}

export async function getDetailsWithProfileLink(
  profile_link: string
): Promise<EmailLookupResponse | null> {
  try {
    // if (process.env.NODE_ENV === "development") {
    //   return data;
    // }
    const res = await fetch(
      `${ENDPOINT}/profile?apikey=${
        process.env.REVERSE_CONTACT_LOOKUP
      }&linkedinUrl=${encodeURIComponent(profile_link)}`
    );
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function redactString(str: string) {
  let redacted = "*".repeat(str.length);
  return redacted;
}
