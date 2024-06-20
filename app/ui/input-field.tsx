"use client";

import type { NavbarProps } from "@nextui-org/react";

import React, { useState } from "react";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { getDetailsWithEmail } from "@/lib/utils";
import Profile from "./user/profile";
import data from "../../lib/data.json";
import { useUser } from "@clerk/nextjs";

export default function InputField({ aim }: { aim?: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState<null | Boolean | Object>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoaded, isSignedIn, user } = useUser();

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  async function handleSearch() {
    if (isInvalid) return;
    console.log(value);
    setLoading(true);
    try {
      const res = await getDetailsWithEmail(value);
      console.log(res);
      setSucess(res);
    } catch (error) {
      console.error(error);
      setSucess(null);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex md:flex-row  justify-center gap-4  py-4 relative items-baseline flex-col">
      <Input
        value={value}
        isInvalid={isInvalid}
        fullWidth
        aria-label="email address"
        className="w-80 h-12"
        labelPlacement="outside"
        // placeholder="Try an email address"
        placeholder={
          aim === "email" ? "Try an email address" : "Try a LinkedIn profile"
        }
        // startContent={<Icon icon="solar:magnifer-linear" />}
        size="lg"
        variant="bordered"
        color={isInvalid ? "danger" : "success"}
        errorMessage="Please enter a valid email"
        onValueChange={setValue}
        classNames={{
          errorMessage: "absolute top-0.5",
        }}
      />
      <Button
        size="lg"
        className="text-sm"
        color="primary"
        variant="shadow"
        onClick={handleSearch}
        isLoading={loading}
        // onPress={onOpen && }
      >
        Search now
      </Button>
    </div>
  );
}
