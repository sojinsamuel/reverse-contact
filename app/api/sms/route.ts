import { Knock } from "@knocklabs/node";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getRecord } from "@/app/actions";
import { DatabaseRecord } from "@/definitions/types";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

// getUserDetails();
export async function POST(request: Request) {
  try {
    const smsNotification = await request.json();
    console.log({ smsNotification });

    // const result = (await getRecord(notification[0]?.email)) as DatabaseRecord;

    // if (!result)
    //   return new Response(`User not found`, {
    //     status: 404,
    //   });

    // console.log(result);

    // await knockClient.notify("email-read", {
    //   actor: result.recipientId,
    //   recipients: [result.recipientId],
    //   data: {
    //     ...notification[0],
    //   },
    // });

    return new Response(`User notified`, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      `Email error we have an error ${error?.message || error}`
    );
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    return new Response(`Hello sms, ${userId}!`);
  } catch (error: any) {
    return new Response(`SMS Error: ${error?.message || error}`);
  }
}
