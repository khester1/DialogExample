import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

let data: any;

let testUserId = "11111115-0000-0000-0000-000000000000";
let testIds = [
  "0a3f535e-7ce9-445e-bde8-ecefce3d06d5", //NOTE:: This is mock data, please replace with actual data
  "d85a2167-f6c5-4f87-8734-3e80b2f3aef9",
];

if (window.location.hostname === "localhost") {
  data = {
    requestFrom: "Contact",
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
    alert(
      "Selected Items: " +
        data.selectedItems +
        " Request From: " +
        data.requestFrom +
        " User Id: " +
        data.userId
    );
  } else {
    data = {
      requestFrom: "Contact",
      selectedItems: testIds,
      userId: testUserId,
    };
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);

// Rendering of application and passing parameters inside
root.render(
  <React.StrictMode>
    <App
      selectedItems={data.selectedItems}
      requestFrom={data.requestFrom}
      userId={data.userId}
    />
  </React.StrictMode>
);
