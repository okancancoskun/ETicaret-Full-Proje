// Install request by running "npm install --save request"
var request = require("request");

var options = {
  method: "POST",
  url: "https://testapi.mngkargo.com.tr/mngapi/api/barcodecmdapi/createbarcode",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMTI5NDc3MDIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwianRpIjoiZDZiMDk5NDktYWQxMS00NzRmLWE5NGMtODFlYmE2NGUzMWFiIiwiZXhwIjoxNjAxODg3NzQ5LCJpc3MiOiJ3d3cubW5na2FyZ28uY29tLnRyIiwiYXVkIjoiaW50ZWdyYXRpb24tZGV2ZWxvcGVycyJ9.kC8CfB2KVMNxB-eZCl48Acub5pY7cUPGqQKW5Dov3BI",
    // 'x-api-version': 'REPLACE_THIS_VALUE',
    "x-ibm-client-secret": "yQ0kV6wK2sW1eI8kQ5wB7pP5mY8aS3pR2kN4wS7yP0gA2vY5sK",
    "x-ibm-client-id": "d27f9684-2fc3-4004-8cee-4df0dab27856",
  },
  body: {
    referenceId: "SIPARIS34567",
    billOfLandingId: "İrsaliye 1",
    isCOD: 0,
    codAmount: 0,
    printReferenceBarcodeOnError: 0,
    message: "Mesaj 1",
    additionalContent1: "",
    additionalContent2: "",
    additionalContent3: "",
    additionalContent4: "",
    orderPieceList: [
      {
        barcode: "SIPARIS34567_PARCA1",
        desi: 2,
        kg: 1,
        content: "Parça açıklama 1",
      },
      {
        barcode: "SIPARIS34567_PARCA2",
        desi: 2,
        kg: 3,
        content: "Parça açıklama 2",
      },
    ],
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) return console.error("Failed: %s", error.message);

  console.log("Success: ", body);
});

//---------------------------

// Install request by running "npm install --save request"
var request = require("request");

var options = {
  method: "GET",
  url: "https://testapi.mngkargo.com.tr/mngapi/api/standardqueryapi/trackshipment/REPLACE_REFERENCEID",
  headers: {
    accept: "application/json",
    authorization: "REPLACE_THIS_VALUE",
    "x-api-version": "REPLACE_THIS_VALUE",
    "x-ibm-client-secret": "İstemci güvenlik dizgisi",
    "x-ibm-client-id": "Client ID",
  },
};

request(options, function (error, response, body) {
  if (error) return console.error("Failed: %s", error.message);

  console.log("Success: ", body);
});
