"use client";

import React from "react";
import { Input, Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { createRecord, sendEmail } from "@/app/actions";
import { useUser } from "@clerk/nextjs";

export default function ContactByEmail({
  email = "",
  message = "",
}: {
  email?: string;
  message?: string;
}) {
  const [form, setForm] = React.useState({
    subject: "",
    email: email || "",
    message: message || "",
  });
  const [loading, setLoading] = React.useState(false);
  const [sucess, setSucess] = React.useState<null | Boolean>(null);
  const { user } = useUser();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      Promise.allSettled([
        await sendEmail(form),
        await createRecord(form.email, user?.id || "id_invalid"),
      ]);
      // const res = await sendEmail(form);
      // await createRecord(form.email, user?.id || "id_invalid");
      // console.log(res);
      setSucess(true);
    } catch (error) {
      console.error(error);
      setSucess(false);
    } finally {
      setLoading(false);
    }
  }

  if (sucess) {
    return (
      <div className="flex flex-col w-full">
        <Card className="max-w-full w-[340px] max-h-full">
          <CardBody className="overflow-hidden">
            <div className="flex flex-col justify-center items-center gap-4 h-[300px]">
              {/* <Icon icon="akar-icons:email" className="text-5xl text-primary" /> */}
              <h1 className="text-lg font-bold text-center">Email sent</h1>
              <p
                className=" 
              text-center
              text-sm
              text-gray-500
              break-normal
            
             "
              >
                Your email has been sent successfully to {email}. In a few
                minutes, you will receive the message (check spam folder if not
                found).
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] max-h-full">
        <CardBody className="overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 h-[300px]"
          >
            <Input
              isRequired
              label="Subject"
              placeholder="Enter your name"
              type="text"
              value={form.subject}
              onChange={(e) => {
                setForm({ ...form, subject: e.target.value });
              }}
            />
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
            <Textarea
              isRequired
              label="Message"
              placeholder="Enter your message"
              maxRows={3}
              spellCheck
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
              }}
            />
            {typeof sucess === "boolean" && !sucess && (
              <p className="text-red-500">Failed to send email</p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                isLoading={loading}
                type="submit"
                fullWidth
                color="primary"
              >
                Send
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
