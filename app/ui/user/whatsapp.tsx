"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Button,
  Spacer,
} from "@nextui-org/react";

export default function Whatsapp(props: CardProps) {
  return (
    <Card className="w-[420px]" {...props}>
      <CardBody className="px-3 pb-1">
        <Image
          alt="Card image"
          className="aspect-video w-full object-cover object-top"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/airpods.png"
        />
        <Spacer y={2} />
        <div className="flex flex-col gap-2 px-2">
          <p className="text-large font-medium">Scan this QR Code First</p>
          <p className="text-small text-default-400">
            After scanning the QR code, let me know by clicking the continue
            button.
          </p>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button fullWidth variant="light">
          Cancel
        </Button>
        <Button fullWidth>Continue</Button>
      </CardFooter>
    </Card>
  );
}
