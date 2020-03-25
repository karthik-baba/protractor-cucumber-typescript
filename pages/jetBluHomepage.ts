import { $, ElementFinder, element, by } from "protractor";

export class JetBluHomePage {
  public fromTxtBox: ElementFinder;

  public toTxtBox: ElementFinder;
  public welcomeTxt: ElementFinder;
  public departureDate: ElementFinder;
  public returnDate: ElementFinder;
  public searchBtn: ElementFinder;

  constructor() {
    this.fromTxtBox = $("input[placeholder='Where from?']");
    this.toTxtBox = $("input[placeholder='Where to?']");
    this.welcomeTxt = $("h1[id='first-focus']");
    this.departureDate = element(
      by.xpath("//input[starts-with(@id,'departure-date_')]")
    );
    this.returnDate = element(
      by.xpath("//input[starts-with(@id,'return-date_')]")
    );

    this.searchBtn = element(
      by.xpath("//button/span[text()='Search flights']")
    );
  }

  async isWelcomeTxtDisplayed(): Promise<boolean> {
    return await this.welcomeTxt.isDisplayed();
  }
}
