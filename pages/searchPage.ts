import { $, ElementFinder, element, by } from "protractor";

export class SearchPageObject {
  [x: string]: any;
  public resultsHeader1: ElementFinder;
  public resultHeader2: ElementFinder;
  // public searchButton: ElementFinder;
  // public logo: ElementFinder;

  constructor() {
    // this.searchTextBox = $("input[title='Search']");
    // this.searchButton = $("input[value='Google Search']");
    // this.logo = $("div.logo img");
    this.resultsHeader1 = element(by.xpath("//h3[text()='Departing flights']"));
    this.resultHeader2 = element(by.xpath("//div[@id='headBlock_0']/div/h2"));
  }
}
