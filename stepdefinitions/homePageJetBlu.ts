import { browser, Key, ExpectedConditions } from "protractor";
import { JetBluHomePage } from "../pages/jetBluHomepage";
import { Then } from "cucumber";
import { SearchPageObject } from "../pages/searchPage";
const { Given, When } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

var jetBluHomePage = new JetBluHomePage();
var searchPageResults = new SearchPageObject();

Given("I am on jetBlu home page", async () => {
  await expect(browser.getTitle()).to.eventually.equal(
    "Airline Tickets, Flights & Airfare: Book Direct - Official Site | JetBlue"
  );
});

When("I see the jetblu url", async () => {
  //console.log(browser.getCurrentUrl());
  await expect(browser.getCurrentUrl()).to.eventually.equal(
    "https://www.jetblue.com/"
  );
});

Then("I should see welcome message", async () => {
  // Write code here that turns the phrase above into concrete actions
  return await jetBluHomePage.isWelcomeTxtDisplayed();
});

When(/^I type "(.*?)" in the from field$/, async text => {
  await jetBluHomePage.fromTxtBox.clear();
  await jetBluHomePage.fromTxtBox.sendKeys(text, Key.TAB);
});

When(/^I type "(.*?)" in the to field$/, async text => {
  await jetBluHomePage.fromTxtBox.clear();
  await jetBluHomePage.toTxtBox.sendKeys(text, Key.TAB);
});

When(/^I type "(.*?)" in the departure date$/, async text => {
  await jetBluHomePage.fromTxtBox.clear();
  await jetBluHomePage.departureDate.sendKeys(text, Key.TAB);
});

When(/^I type "(.*?)" in the return date$/, async text => {
  await jetBluHomePage.fromTxtBox.clear();
  await jetBluHomePage.returnDate.sendKeys(text, Key.TAB);
});

When(/^I click on search button$/, async () => {
  await jetBluHomePage.searchBtn.click();
});

Then("I should see Departing flights", async () => {
  // Write code here that turns the phrase above into concrete actions
  browser.wait(
    searchPageResults.resultsHeader1.isDisplayed(),
    10000,
    "error message"
  );
  return await expect(
    searchPageResults.resultsHeader1.getText()
  ).to.eventually.equal("Departing Flights");
});
