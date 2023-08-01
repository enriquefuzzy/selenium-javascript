const { By, Key, until } = require('selenium-webdriver');

class GoogleSearchPage {
    constructor(driver) {
        this.driver = driver;
    }

    async getSearchTextbox() {
        return await this.driver.findElement(By.css('[name=q]'));
    }
    async getSearchResultTitleText() {
        return await this.driver.findElement(By.css('[data-attrid="title"]'))
    }
}
module.exports = GoogleSearchPage
