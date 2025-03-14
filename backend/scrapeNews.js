const { PrismaClient } = require("@prisma/client");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const prisma = new PrismaClient();

async function News(category) {
    let options = new chrome.Options();
    options.addArguments("--headless", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage");
    options.addArguments("--disable-webgl", "--disable-software-rasterizer", "--enable-unsafe-swiftshader");
    let cat = category;
    if(cat==="future-planet"){
        cat="earth";
    }
    await prisma[cat].deleteMany();
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    
    console.log(`Scraping started for ${cat}`);

    try {
        await driver.get(`https://www.bbc.com/${category}`);
        await driver.wait(until.elementsLocated(By.css('[data-testid="internal-link"]')), 25000);

        let articleElements = await driver.findElements(By.css('[data-testid="internal-link"]'));
        let articleLinks = [];

        for (let el of articleElements) {
            let link = await el.getAttribute("href");
            if (link.includes("news/")) {
                articleLinks.push(link.startsWith("http") ? link : "https://www.bbc.com" + link);
            }
        }

        for (let link of articleLinks) {
            try {
                await driver.get(link);
                await driver.wait(until.elementLocated(By.css("h1")), 5000);

                let articleData = {
                    title: await extractText(driver, "h1", "No title"),
                    description: await extractText(driver, "p", "No description available"),
                    author: await extractText(driver, '.sc-b42e7a8f-7.kItaYD, .kItaYD, [class*="kItaYD"]', "Unknown Author"),
                    timestamp: await extractAttribute(driver,'time[datetime], time[class*="jViTsK"]', "datetime", "No timestamp"),
                    imageUrl: await extractAttribute(driver, "article img", "src", "No image available"),
                    content: await extractMultipleText(driver, 'sc-18fde0d6-0.dlWCEZ, .dlWCEZ, [class*=".dlWCEZ"]'),
                    url: link
                };
                
                await prisma[cat].upsert({
                    where: { url: articleData.url },
                    update: articleData,
                    create: articleData,
                });

            } catch (err) {
                console.error(`Error scraping ${link}:`, err);
            }
        }

        console.log("Scraping finished.");
    } catch (error) {
        console.error("Scraping Error:", error);
    } finally {
        await driver.quit();
        await prisma.$disconnect();
    }
}

// Helper functions
async function extractText(driver, selector, defaultValue) {
    try {
        return await driver.findElement(By.css(selector)).getText();
    } catch (error) {
        return defaultValue;
    }
}

async function extractAttribute(driver, selector, attribute, defaultValue) {
    try {
        return await driver.findElement(By.css(selector)).getAttribute(attribute);
    } catch (error) {
        return defaultValue;
    }
}

async function extractMultipleText(driver, selector) {
    try {
        let elements = await driver.findElements(By.css(selector));
        let textArray = [];
        for (let el of elements) {
            textArray.push(await el.getText());
        }
        return textArray.join("\n");
    } catch (error) {
        return "No content available";
    }
}



// /news
// /business
// /innovation
// /culture
// /future-planet
// /travel
// /arts
// News("news");

module.exports = News;
