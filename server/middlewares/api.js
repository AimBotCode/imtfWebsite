/* eslint no-unused-expressions: "off" */
import { json } from "body-parser";
const axios = require("axios");

const sendResponse = function (result, res, err) {
  res.setHeader("Content-Type", "application/json");
  if (process.env.CORS_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type");

  let respObj = result;
  if (err) {
    respObj = err;
  }

  const statusCode = err ? err.status || err.statusCode || 500 : 200;
  res.writeHead(statusCode);
  res.end(JSON.stringify(respObj));
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

async function request(url, req) {
  return await axios({
    method: req.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url,
    data: req.body,
  }).then((response) => response.data);
}

async function proxyRequest(req, res, url) {
  if (req.method === "OPTIONS") {
    sendResponse({}, res);
    return;
  }

  try {
    const response = await request(url, req);
    sendResponse(response, res);
  } catch (error) {
    sendResponse(
      { success: false },
      res,
      error.response || { message: error.message }
    );
  }
}

export default [
  json(),
  {
    path: "/api/login",
    async handler(req, res) {
      await proxyRequest(req, res, process.env.API_URL);
    },
  },
  {
    path: "/api/profiles",
    async handler(req, res) {
      await proxyRequest(req, res, process.env.API_URL);
    },
  },
    {
    path: "/api/tags",
    async handler(req, res) {
      await proxyRequest(req, res, process.env.API_URL);
    },
  },
  {
    path: "/api/scanner",
    async handler(req, res) {
      const url = process.env.API_URL;
      await proxyRequest(req, res, url);
    },
  },
  {
    path: "/api/seasonality",
    async handler(req, res) {
      await proxyRequest(req, res, process.env.API_URL);
    },
  },
  {
    path: "/api/wordpress",
    async handler(req, res) {
      const url = "https://www.imtftrade.com/wp-json/custom-plugin/login";
      await proxyRequest(req, res, url);
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
