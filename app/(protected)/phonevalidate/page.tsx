import React from "react";
import { NextPage } from "next";
import { UserI } from "@/definitions/types";

export default async function PhoneValidate() {
  return (
    <div className="flex justify-center items-center">
      {/* <h1 className="text-2xl font-bold">PhoneValidate</h1> */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold">Server</h2>
          <div>
            <pre> {JSON.stringify("Auth0 removed", null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
