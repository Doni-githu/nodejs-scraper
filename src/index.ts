import puppeteer from 'puppeteer-extra';
import puppeteerExtraPluginStealth from "puppeteer-extra-plugin-stealth";
import { saveCsv, filterRequest, getCatalogs } from "./utils"

puppeteer.use(puppeteerExtraPluginStealth())
puppeteer.launch({ headless: false, channel: 'chrome' })
    .then(async (browser) => {
        const page = await browser.newPage();
        page.setRequestInterception(true)
        page.on('request', filterRequest);
        await page.goto("https://www.dns-shop.ru/catalog/17a8d26216404e77/vstraivaemye-xolodilniki/")
        await page.waitForSelector('.catalog-product', { timeout: 20000 });
        await page.waitForSelector(".product-buy__price", { timeout: 20000 })
        const allNeedsData = await getCatalogs(page)
        saveCsv(allNeedsData, ['name', 'price'])
        await browser.close()
    })
