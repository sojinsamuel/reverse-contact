"use client";

import { cn } from "@/lib/cn";
import React from "react";
import {
  Tabs,
  Input,
  Tab,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import { sendSms } from "@/app/actions";

export default function ContactBySms({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) {
  const [form, setForm] = React.useState({
    phoneNumber: phoneNumber || "",
    message: message || "",
  });
  const [loading, setLoading] = React.useState(false);
  const [sucess, setSucess] = React.useState<null | Boolean>(null);

  console.log(form);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendSms(form.phoneNumber, form.message);
      console.log(res);
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
              <h1 className="text-lg font-bold text-center">SMS sent</h1>
              <p
                className=" 
                  text-center
                  text-sm
                  text-gray-500
                  break-normal
                 "
              >
                Your sms has been sent successfully to {phoneNumber}. In a few
                seconds, you will receive the message.
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
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => {
                setForm({ ...form, phoneNumber: e.target.value });
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
              <p className="text-red-500 text-center">Failed to send SMS</p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                isLoading={loading}
                type="submit"
                fullWidth
                color="primary"
              >
                Send SMS
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

// export default function ContactByEmail({
//   email = "",
//   message = "",
// }: {
//   email?: string;
//   message?: string;
// }) {

// }
