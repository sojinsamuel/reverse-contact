import { PhoneDetailsI } from "@/definitions/types";
import React from "react";

const PhoneDetails = ({ details }: { details: PhoneDetailsI }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Phone Number Details
      </h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Country Code:</h2>
          <p>{details.countryCode}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Calling Country Code:</h2>
          <p>{details.callingCountryCode}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Phone Number:</h2>
          <a href={details.url} className="text-blue-500 hover:underline">
            {details.phoneNumber}
          </a>
        </div>
        <div>
          <h2 className="text-lg font-medium">National Format:</h2>
          <p>{details.nationalFormat}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Validity:</h2>
          <p>{details.valid ? "Valid" : "Invalid"}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Carrier Name:</h2>
          <p>{details.lineTypeIntelligence.carrier_name}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Mobile Country Code:</h2>
          <p>{details.lineTypeIntelligence.mobile_country_code}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Mobile Network Code:</h2>
          <p>{details.lineTypeIntelligence.mobile_network_code}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Line Type:</h2>
          <p>{details.lineTypeIntelligence.type}</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetails;
