"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import SearchViaEmail from "./search-email";
import SearchViaLinkedinProfile from "./search-profile";
import InputField from "../input-field";

export default function DashboardMain() {
  return (
    <Card className="lg:w-[50%]  mx-auto">
      <div className="  flex-1 p-4   ">
        <h2 className="mt-2 text-small text-default-500">
          Customize settings, email preferences, and web appearance.
        </h2>
        {/*  Tabs */}
        <div className="flex justify-center items-center ">
          <Tabs
            //   fullWidth
            fullWidth
            classNames={{
              base: "mt-2 flex justify-center items-center w-full",
              // cursor: "bg-content1 dark:bg-content1",
              panel: " p-0 mx-auto  ",
              tab: "",
              wrapper: "w-full mx-auto ",
            }}
            size="lg"
            radius="lg"
            placement="top"
            color="secondary"
          >
            <Tab key="email" title="Email">
              <div className="flex justify-center items-center mt-8 ">
                <InputField aim="email" />
              </div>
            </Tab>
            <Tab key="linkedinlink" title="LinkedinLink">
              <div className="flex justify-center items-center mt-8">
                <InputField aim="linkedinlink" />
              </div>
            </Tab>
            <Tab key="test3" title="Test3">
              <div className="flex justify-center items-center mt-8">
                <InputField />
              </div>
            </Tab>
            {/* <Tab key="test4" title="Test4">
            <div className="flex justify-center items-center mt-8">
              <InputField />
            </div>
          </Tab> */}
          </Tabs>
        </div>
      </div>
    </Card>
  );
}
