"use server";

import type { CoreMessage, ToolInvocation } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import React, { ReactNode } from "react";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  getDetailsWithEmail,
  getDetailsWithProfileLink,
  sleep,
} from "@/lib/utils";
import Profile from "./ui/user/profile";
import { Link } from "@nextui-org/react";
import Markdown from "markdown-to-jsx";
import sgMail from "@sendgrid/mail";
import ContactByEmail from "./ui/user/email";
import { generateText } from "ai";
import { DatabaseRecord, FormDataI } from "@/definitions/types";
import twilio from "twilio";
import ContactBySms from "./ui/user/sms";
import {
  docClient,
  PutCommand,
  GetCommand,
} from "@/aws/dynamodb/DynamoDBClient";
// system message for reverse contact lookup
const content = `
  YOu are a reverse contact lookup assistant. 
  and you can help users find information about a person  using their email address. 
  You can also help users find information about a person  using their profile link.

  if the user wants to find information about a person using their email address, call the \`get_details_with_email\` to show the user the information.
  if the user wants to find information about a person using their profile link, call the \`get_details_with_profile_link\` to show the user the information.
  if the user wants to send an email to a person, call the \`send_email\` to send the email to the person.
  if the user wants to send an sms to a person, call the \`send_sms\` to send the sms to the person.
  
  - Use markdown to format the text in a better way for the user to understand. add new line after each sentence.

    respectfully decline the user request if anything irrelvant is being asked except the one you are being assigned to do
`;

const failedMessage = (
  <p className="text-red-500">
    Something went wrong, if the issue persists please contact us through our
    help center at&nbsp;
    <Link href="mailto:sojinsamuel2001@gmail.com" size="sm">
      sojinsamuel2001@gmail.com
    </Link>
  </p>
);

export const sendMessage = async (
  message: string
): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> => {
  const history = getMutableAIState<typeof AI>();
  history.update([
    ...history.get(),
    {
      role: "user",
      content: message,
    },
  ]);
  try {
    const reply = await streamUI({
      model: openai("gpt-4o-2024-05-13"),

      messages: [
        {
          role: "system",
          content,
          toolInvocations: [],
        },
        ...history.get(),
      ] as CoreMessage[],
      initial: <p>Loading...</p>,
      text: ({ content, done }) => {
        if (done) {
          history.done([...history.get(), { role: "assistant", content }]);
        }
        return <Markdown options={{ wrapper: "article" }}>{content}</Markdown>;
      },
      temperature: 0,
      tools: {
        get_details_with_email: {
          description: "Get details from the given email address only. ",
          parameters: z.object({
            email: z
              .string()
              .describe("Email address of the person to lookup."),
          }),
          generate: async function* ({ email }: { email: string }) {
            console.log("email", email);
            yield <p>Loading...</p>;
            const details = await getDetailsWithEmail(email);
            if (!details) {
              history.done([
                ...history.get(),
                {
                  role: "assistant",
                  name: "get_details_with_email",
                  content: `Error occured for ${email} try again: \n ${JSON.stringify(
                    details,
                    null,
                    2
                  )}`,
                },
              ]);
              return failedMessage;
            }
            console.log("details:: ", JSON.stringify(details, null, 2));
            await sleep(1000);

            history.done([
              ...history.get(),
              {
                role: "assistant",
                name: "get_details_with_email",
                content: `Details of ${email} is: \n ${JSON.stringify(
                  details,
                  null,
                  2
                )}`,
              },
            ]);
            return <Profile details={details} />;
          },
        },
        get_details_with_profile_link: {
          description:
            "Get details from the given linkedin profile link. Only linkedin profile links are supported. eg: https://www.linkedin.com/in/username/",
          parameters: z.object({
            profile_link: z
              .string()
              .describe(
                "Linkedin profile link to lookup. eg: https://www.linkedin.com/in/username/"
              ),
          }),
          generate: async function* ({
            profile_link,
          }: {
            profile_link: string;
          }) {
            console.log("profile_link", profile_link);
            yield <p>Loading...</p>;
            const details = await getDetailsWithProfileLink(profile_link);
            if (!details) {
              history.done([
                ...history.get(),
                {
                  role: "assistant",
                  name: "get_details_with_profile_link",
                  content: `Error occured for ${profile_link} try again: \n ${JSON.stringify(
                    { details },
                    null,
                    2
                  )}`,
                },
              ]);
              return failedMessage;
            }
            await sleep(1000);
            history.done([
              ...history.get(),
              {
                role: "assistant",
                name: "get_details_with_profile_link",
                content: `Details of ${profile_link} is: \n ${JSON.stringify(
                  { details },
                  null,
                  2
                )}`,
              },
            ]);
            return <Profile details={details} />;
          },
        },
        send_email: {
          description: "When user requests to send an email to a person.",
          parameters: z.object({
            email: z.string().describe("Email address of the person to send."),
            message: z.string().describe("Message to send to the person."),
          }),
          generate: async function* ({ email, message }) {
            // yield <p>Loading...</p>;
            return <ContactByEmail email={email} message={message} />;
          },
        },
        send_sms: {
          description: "When user requests to send an sms to a person.",
          parameters: z.object({
            phone: z
              .string()
              .describe(
                "Phone number of the person to send. must include the appropriate country code eg: +1 for US, +91 for India etc."
              ),
            message: z
              .string()
              .describe(
                "Message to send to the person. it should be less than 160 characters. if it is more than 160 characters, it will be truncated."
              ),
          }),
          generate: async function* ({ phone, message }) {
            // yield <p>Loading...</p>;
            return <ContactBySms phoneNumber={phone} message={message} />;
          },
        },
      },
    });
    return {
      id: Date.now(),
      role: "assistant",
      display: reply.value,
    };
  } catch (error) {
    return {
      id: Date.now(),
      role: "assistant",
      display: failedMessage,
    };
  }
};

export type AIState = Array<{
  id?: number;
  name?:
    | "get_details_with_email"
    | "get_details_with_profile_link"
    | "send_email"
    | "send_sms";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: string;
  role: "user" | "assistant";
  display: ReactNode | string;
  toolInvocations?: ToolInvocation[];
}>;

export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});

export async function chatCompletions(prompt: string) {
  try {
    const result = await generateText({
      model: openai("gpt-4o-2024-05-13"),
      prompt,
    });
    console.log(result.text);
    return result.text;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

export async function sendEmail(form: FormDataI) {
  const { email, message, subject } = form;
  console.log("form", form);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const myPrompt = `
  For the given markup, design a very beautiful email template using html and inline styles. 
  Make sure it looks very good and have a good aesthetic design.
  use all your creativity to make it look very good.
      Markup below:
      ####
      ${message}
      ####

      Strict rules:
      - Make sure the output doesnt contain any of your feedback or your introductory text in the start or end. 
      - The Output must only contain the email template.
  `;

  try {
    let result = null;

    if (message.length > 100) {
      // only prettify if the message is greater than 100 characters
      result = await chatCompletions(myPrompt);
    }

    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL_ADDRESS!,
      subject,
      html: result || message,
    });
    console.log("Email sent");
    return { message: "Email sent", status: true };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return error;
  }
}

export async function sendSms(
  phone: string,
  message: string
): Promise<boolean> {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    const res = await client.messages.create({
      body: message,
      from: "MG7e55a5f84a9375efa8a51d19f3852844",
      to: phone,
    });
    console.log(res);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
    return false;
  }
}

export async function createRecord(email: string, id: string) {
  const command = new PutCommand({
    TableName: "notifications",
    Item: {
      email,
      recipientId: id,
    },
  });

  const response = await docClient.send(command);
  return response;
}

export async function getRecord(key: string) {
  console.log("key", key);
  try {
    const command = new GetCommand({
      TableName: "notifications",
      Key: {
        email: key || "None found",
      },
    });

    const response = await docClient.send(command);

    // console.log(response.Item);

    const { email, recipientId } = response.Item as DatabaseRecord;

    return { email, recipientId };
  } catch (error) {
    console.error(error);
    return null;
  }
}
