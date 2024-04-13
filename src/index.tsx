import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let data: any;

let testUserId = "11111115-0000-0000-0000-000000000000";
let testIds = ["b4ba8c17-fd98-40c4-b18e-24a37d91765a","b4ba1c11-fd98-40c4-b18e-24a37d91765a"];

  if (window.location.hostname === "localhost") {
    data = {
      requestFrom: "Submittal",
      selectedItems: testIds, 
      userId: testUserId
    };
  
  }
  else {
    //following code parses url of dialog to extract required data including "data" parameter
    const queryString = window.location.search.substring(1);
    let params: any = {};
    const queryStringParts = queryString.split("&");
    for (let i = 0; i < queryStringParts.length; i++) {
      const pieces = queryStringParts[i].split("=");
      params[pieces[0].toLowerCase()] = pieces.length === 1 ? null : decodeURIComponent(pieces[1]);
    }
   
    //deserializing of the data parameter
    if (params.data) {
      data = JSON.parse(params.data);
      alert("Selected Items: " + data.selectedItems + " Request From: " + data.requestFrom + " User Id: " + data.userId);

    } else {

      data = {
        requestFrom: "Submittal",
        selectedItems: testIds, 
        userId: testUserId
      };
    }
  }
   

//rendering of application and passing parameters inside
ReactDOM.render(
  <App selectedItems={data.selectedItems} requestFrom={data.requestFrom} userId={data.userId} />,
  document.getElementById('root')
);