import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const Xrm = (window.parent && window.parent.Xrm) || undefined;
let data: any;
let testUserId = "11111115-0000-0000-0000-000000000000";
let testIds = [
  "0a3f535e-7ce9-445e-bde8-ecefce3d06d5",
  "d85a2167-f6c5-4f87-8734-3e80b2f3aef9",
];

if (window.location.hostname === "localhost") {
  data = {
    selectedItems: testIds,
    userId: testUserId,
  };
} else {
  // Following code parses URL of dialog to extract required data including "data" parameter
  const queryString = window.location.search.substring(1);
  let params: any = {};
  const queryStringParts = queryString.split("&");
  for (let i = 0; i < queryStringParts.length; i++) {
    const pieces = queryStringParts[i].split("=");
    params[pieces[0].toLowerCase()] =
      pieces.length === 1 ? null : decodeURIComponent(pieces[1]);
  }

  // Deserializing of the data parameter
  if (params.data) {
    data = JSON.parse(params.data);
  } else {
    data = {
      selectedItems: testIds,
      userId: testUserId,
    };
  }
}

if (!Xrm) {
  console.error(
    "Unable to fetch Xrm context. Ensure this page is running within Dynamics 365."
  );
}
// Ensure Xrm context is available before making the API call

var recordId = data.selectedItems[0]; // Replace with the GUID of the record you want to update
console.log("Record ID to update:", recordId);
console.log("User ID:", data.userId);

var record: { [key: string]: any } = {};
record["stn_creditreleasedby@odata.bind"] = `/systemusers(${data.userId})`;
record.stn_creditreleaseddate = new Date().toISOString();
record.statuscode = 924450003; // Status
record.stn_creditreleasereason = 272280001; // Choice

Xrm.WebApi.updateRecord("stn_order", recordId, record).then(
  function success(result: { id: any }) {
    console.log("Record updated successfully. ID:", result.id);
  },
  function (error: { message: any }) {
    console.error("Error updating record:", error.message);
  }
);

const container = document.getElementById("root");
const root = createRoot(container!);

// Rendering of application and passing parameters inside
root.render(
  <React.StrictMode>
    <App selectedItems={data.selectedItems} userId={data.userId} />
  </React.StrictMode>
);
