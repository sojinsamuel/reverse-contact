import { Knock } from "@knocklabs/node";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getRecord } from "@/app/actions";
import { DatabaseRecord } from "@/definitions/types";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

// getUserDetails();
export async function POST(request: Request) {
  try {
    const notification = await request.json();
    console.log({ notification });

    const result = (await getRecord(notification[0]?.email)) as DatabaseRecord;

    if (!result)
      return new Response(`User not found`, {
        status: 404,
      });

    console.log(result);

    await knockClient.notify("email-read", {
      actor: result.recipientId,
      recipients: [result.recipientId],
      data: {
        ...notification[0],
      },
    });

    return new Response(`User notified`, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      `Error: Hello we have an error ${error?.message || error}`
    );
  }
}

export async function GET(request: Request) {
  // const session = await getSession();
  // const user = session?.user;
  try {
    // const notification = request.body;
    // console.log({ notification });

    // await knockClient.notify("email-read", {
    //   actor: user?.sub,
    //   recipients: [user?.sub],
    //   data: {
    //     email: "sojinsamuel@test.com",
    //     event: "open",
    //     ip: "255.255.255.255",
    //     sg_content_type: "html",
    //     sg_event_id: "sg_event_id",
    //     sg_machine_open: false,
    //     sg_message_id: "sg_message_id",
    //     timestamp: 1513299569,
    //     useragent:
    //       "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
    //   },
    // });
    const { userId } = auth();
    return new Response(`Hello, ${userId}!`);
  } catch (error: any) {
    return new Response(`Error: ${error?.message || error}`);
  }
}
