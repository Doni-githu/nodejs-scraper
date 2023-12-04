import { Page } from "puppeteer";

export default async function (page: Page) {
    const data = await page.$$(".catalog-product");
    const allNeedsData = []
    for (const data2 of data) {
        let name = await data2.$eval("a.catalog-product__name > span", e => e.innerText);
        const price = await data2.$eval(".product-buy__price", e => e.textContent.split("₽")[0] + "₽");
        allNeedsData.push({ name, price })
    }
    return allNeedsData
}