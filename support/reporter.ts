import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
const jsonReports = path.join(process.cwd(), "/reports/json");
const htmlReports = path.join(process.cwd(), "/reports/html");
const targetJson = jsonReports + "/cucumber_report.json";
const del = require("del");

const cucumberReporterOptions = {
  jsonFile: targetJson,
  output: htmlReports + "/cucumber_reporter.html",
  reportSuiteAsScenarios: true,
  theme: "bootstrap"
};

export class Reporter {
  public static createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    //add to remove the reports directory everytime
    // tests run
    else {
      (() => {
        del([
          ".tmp/*.*",
          ".tmp/report/*.*",
          ".tmp/report/features/*.*",
          ".tmp/json-output-folder/*.*"
        ]);
      })();
    }
  }

  public static createHTMLReport() {
    try {
      reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
    } catch (err) {
      if (err) {
        throw new Error("Failed to save cucumber test results to json file.");
      }
    }
  }
}
