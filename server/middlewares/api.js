/* eslint no-unused-expressions: "off" */
import { json } from "body-parser";
const axios = require("axios");

const sendResponse = function (result, res, err) {
  res.setHeader("Content-Type");
  res.setHeader("Access-Control-Allow-Origin", process.env.API_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.writeHead();

  let respObj = result;
  if (err) {
    respObj = err;
  }

  res.write(JSON.stringify(respObj));
};

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

/* const getExpiration = function () {
  const start = Date.now() / 1000
  const end = start + 2592000 // 30 days
  const endDate = new Date(end * 1000)
  return endDate.toUTCString()
} */

async function request(url, req, res) {
  const result = await axios({
    method: req.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url,
    data: req.body,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      sendResponse({ success: false }, res, error.response);
    });
  return result;
}

export default [
  json(),
  {
    path: "/api/profiles",
    async handler(req, res) {
      const url = process.env.API_URL;
      const resp = await request(url, req, res);
      sendResponse(resp, res);
    },
  },
  {
    path: "/api/scanner",
    async handler(req, res) {
      const url = process.env.API_URL;
      console.log(url);
      const resp = await request(url, req, res);
      console.log(resp);
      sendResponse(resp, res);
    },
  },
  {
    path: "/api/seasonality",
    async handler(req, res) {
      const url = process.env.API_URL;
      const resp = await request(url, req, res);
      sendResponse(resp, res);
    },
  },
  {
    path: "/api/wordpress",
    async handler(req, res) {
      const url = "https://www.imtftrade.com/wp-json/custom-plugin/login";
      const resp = await request(url, req, res);
      if (typeof resp === "object") {
        sendResponse(resp, res);
      } else {
        sendResponse({ success: false, message: "Invalid credentials" }, res);
      }
    },
  },
  {
    path: "/api/getToken",
    handler(req, res) {
      if (req.headers.cookie) {
        const cookies = parseCookie(req.headers.cookie);
        const currentValue = cookies[process.env.COOKIE_NAME || "imtftkn"];
        if (currentValue) {
          sendResponse({ token: currentValue }, res);
        } else {
          const error = {
            statusCode: 400,
            raw: { message: "Token not found" },
          };
          sendResponse({ success: false }, res, error);
        }
      } else {
        const error = { statusCode: 400, raw: { message: "Token not found" } };
        sendResponse({ success: false }, res, error);
      }
    },
  },
  {
    path: "/api/deleteToken",
    handler(req, res) {
      const cookieName = process.env.COOKIE_NAME || "vvtkn";
      res.setHeader(
        "SET-COOKIE",
        `${cookieName}=deleted;Path=/;Expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      res.setHeader("Authorization", "");
      sendResponse({ success: true }, res);
    },
  },
];
