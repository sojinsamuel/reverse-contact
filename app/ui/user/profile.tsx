"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  Autocomplete,
  AutocompleteItem,
  CardFooter,
  Chip,
  Link,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { EmailLookupResponse } from "@/definitions/types";
import redactString, { trimText } from "@/lib/utils";

export default function Profile({
  details,
  home,
}: {
  details: EmailLookupResponse;
  home?: boolean;
}) {
  let { email, person, company } = details;

  if (!person && !company) {
    return (
      <Card className="max-w-xl p-2">
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4 ">
          <p className="text-large">Account Details</p>
          <div className="flex gap-4 py-4">
            <Avatar className="h-14 w-14" size="lg" />

            <div className="flex flex-col items-start justify-center">
              <p className="font-medium">No user found</p>
            </div>
          </div>
          <p className="text-small text-default-400">
            No user found for the given details on linkedin
          </p>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Enter email"
            isReadOnly
            value={email || "No email available"}
          />
        </CardBody>
      </Card>
    );
  }
  return (
    <Card className="max-w-xl p-2 " shadow={`${home ? "none" : "md"}`}>
      <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4 ">
        <p className="text-large">Account Details</p>
        <div className="flex gap-4 py-4">
          <Avatar className="h-14 w-14" src={person?.photoUrl} size="lg" />

          <div className="flex flex-col items-start justify-center">
            <p className="font-medium">
              {person?.firstName}&nbsp;{person.lastName}
            </p>
            <span className="text-small text-default-500">
              {person?.headline || "No headline available"}
            </span>
          </div>
        </div>
        <p className="text-small text-default-400">
          {trimText(person?.summary || "No summary available")}
        </p>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <Input
          label="Location"
          labelPlacement="outside"
          placeholder="Enter username"
          isReadOnly
          value={
            home
              ? redactString(person?.location || "No location available")
              : person?.location || "No location available"
          }
        />
        <Input
          label="Email"
          labelPlacement="outside"
          placeholder="Enter email"
          isReadOnly
          value={
            home
              ? redactString(email || "No email available")
              : email || "No email available"
          }
        />
        <Input
          label="Company Name"
          labelPlacement="outside"
          placeholder="Enter first name"
          value={
            home
              ? redactString(company?.name || "No company name available")
              : company?.name || "No company name available"
          }
          readOnly
        />
        <Input
          label="Company tagline"
          labelPlacement="outside"
          placeholder="Enter last name"
          value={
            home
              ? redactString(company?.tagline || "No tagline available")
              : company?.tagline || "No tagline available"
          }
          readOnly
        />
        <Input
          label="Company Website"
          labelPlacement="outside"
          placeholder="Enter phone number"
          value={
            home
              ? redactString(company?.websiteUrl || "No website available")
              : company?.websiteUrl || "No website available"
          }
          readOnly
        />
        <Input
          label="Company Headquarters"
          labelPlacement="outside"
          placeholder="Enter phone number"
          value={`${company?.headquarter?.country || "None"}, ${
            company?.headquarter?.city || "Unavailable"
          }`}
          readOnly
        />
        <Input
          label="Company Industry"
          labelPlacement="outside"
          placeholder="Enter state"
          value={
            home
              ? redactString(company?.industry || "No industry available")
              : company?.industry || "No industry available"
          }
          readOnly
        />
        <Input
          label="Company Employees"
          labelPlacement="outside"
          placeholder="Enter address"
          value={
            home
              ? redactString(
                  company?.employeeCount.toString() ||
                    "No employee count available"
                )
              : company?.employeeCount.toString() ||
                "No employee count available"
          }
          readOnly
        />
      </CardBody>

      <CardFooter className="mt-4 justify-end gap-2">
        {home ? (
          <Button
            color="primary"
            fullWidth
            as={Link}
            href="/sign-up"
            className="font-semibold"
          >
            Sign up for more details
          </Button>
        ) : (
          <Button
            color="primary"
            radius="full"
            fullWidth
            as={Link}
            href={person?.linkedInUrl || "#"}
            target="_blank"
            startContent={<Icon icon="akar-icons:linkedin-fill" />}
          >
            See on linkedin
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
