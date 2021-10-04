var cron = require('node-cron');

const puppeteer = require('puppeteer');



let scrape = async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();

    // await page.goto('http://books.toscrape.com/');
    // await page.click('#default section ol > li:nth-child(2) .product_pod > div.image_container > a > img');
    await page.goto('https://showroom.hyundai.ru/');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let title = document.querySelector('.main .cars-container>div>div>.title').innerText;
        // let price = document.querySelector('.m5-coupMng .gridd .gridd__wrr:nth-child(2) .gridd__body>p').innerText;

        return {
            title
            // price
        }

    });

    browser.close();
    return result;
};




cron.schedule('*/30 * * * * *', () => {
	let datetimenow = new Date().toLocaleString();
	scrape().then((value) => {
  	console.log('running a task every 30 seconds ' + datetimenow);
  	console.log(value); // Получилось!
	});
});