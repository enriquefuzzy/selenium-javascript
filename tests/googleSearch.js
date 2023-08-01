const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const GoogleSearchPage = require('../pages/googleSearchPage');


async function googleSearch() {
  // Set Chrome options to run in headless mode (optional)
  const chromeOptions = new chrome.Options();
  // chromeOptions.addArguments('--headless');

  // Initialize the WebDriver
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  try {
    const googleSearchPage = new GoogleSearchPage(driver);
    // Navigate to Google
    await driver.get('https://www.google.com');

    // Find the search box, enter "Dogs," and press Enter
    const searchBox = await googleSearchPage.getSearchTextbox()
    await searchBox.sendKeys('Dogs', Key.ENTER)

    // Wait for the search results to load
    await driver.wait(until.titleContains('Dogs'), 5000);

    // Assert 'Dog' text is found in the search result
    const searchResultTitleText = await googleSearchPage.getSearchResultTitleText()
    assert.strictEqual(await searchResultTitleText.getText(), 'Dog');
    console.log('Dog text is found!')
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Quit the WebDriver
    await driver.quit();
  }
}

googleSearch();
