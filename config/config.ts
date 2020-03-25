import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
//import { ProcessEnv } from "../env/process.env";
const jsonReports = process.cwd() + "/reports/json";

import { config as configDoten } from "dotenv";
import { resolve } from "path";
import { DevLoginData } from "../env/devConfig";

var devData : DevLoginData();
let baseUrlFromEnv = devData.url;
console.log("url:" + baseUrlFromEnv);

switch (process.env.NODE_ENV) {
  case "dev":
    console.log("dev");
    baseUrlFromEnv = devData.url;
    break;
}

export const config: Config = {
  seleniumAddress: "http://127.0.0.1:4444/wd/hub",

  SELENIUM_PROMISE_MANAGER: false,

  //let env = process.env["NODE_ENV"];

  // baseUrl: "https://www.jetblue.com/",
  baseUrl: baseUrlFromEnv,

  capabilities: {
    browserName: "chrome",

    //Added for reporting purpose
    // Add this
    metadata: {
      browser: {
        name: "chrome",
        version: "80"
      },
      device: "Virtual Machine",
      platform: {
        name: "windows",
        version: "10"
      }
    }
  },

  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  specs: ["../../features/*.feature"],

  onPrepare: () => {
    browser.ignoreSynchronization = true;
    browser
      .manage()
      .window()
      .maximize();
    Reporter.createDirectory(jsonReports);
  },

  cucumberOpts: {
    compiler: "ts:ts-node/register",
    // format: "json:./reports/json/cucumber_report.json",
    format: "json:.tmp/results.json",
    require: [
      "../../typeScript/stepdefinitions/*.js",
      "../../typeScript/support/*.js"
    ],
    strict: true,
    tags: "@Regression"
  },

  //Added newly
  plugins: [
    {
      package: "protractor-multiple-cucumber-html-reporter-plugin",
      options: {
        // read the options part for more options
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        displayDuration: true,
        customData: {
          title: "Run info",
          data: [
            { label: "Project", value: "Custom project" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "B11221.34321" }
          ]
        }
      }
    }
  ],
  onComplete: () => {
    Reporter.createHTMLReport();
  }
};
