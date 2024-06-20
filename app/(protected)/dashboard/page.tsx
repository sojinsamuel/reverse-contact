import React from "react";
import Dashboardclient from "@/app/ui/dashboard/user-client";
import Dashboardserver from "@/app/ui/dashboard/user-server";
import { redirect } from "next/navigation";
import JsonViewer from "@/app/ui/json-view";
import Profile from "@/app/ui/user/profile";
import data from "@/lib/data.json";
import ContactByEmail from "@/app/ui/user/email";
import DashboardMain from "@/app/ui/dashboard/main";
import { ScrollShadow } from "@nextui-org/react";
export default async function Dashboard() {
  // const session = await getSession();
  // const user = session?.user;
  // if (!user) {
  //   redirect("/api/auth/login");
  // }
  // return <JsonViewer />;
  return (
    <div className="mx-auto   w-full flex  flex-col justify-center items-center ">
      {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
      <DashboardMain />
      {/* <div className="grid grid-cols-2 gap-4"> */}
      {/* <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold">Client</h2> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* </div> */}
      {/* <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold">Server</h2>
          </div> */}
      {/* <Dashboardserver /> */}
      <div className=" w-full mx-auto pt-5 flex justify-center items-center ">
        <ScrollShadow className="h-[500px]">
          {/* @ts-ignore */}
          <Profile details={data} />
        </ScrollShadow>
      </div>
      {/* </div> */}
    </div>
  );
}
