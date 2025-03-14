const express = require("express");
const cors = require("cors");
const router = require("./route");
const cron = require("node-cron");
const compression = require("compression");
const News = require("./scrapeNews");

const app = express();
app.use(cors());
app.use(compression());

const categories = ["news", "business", "innovation", "culture", "future-planet", "travel", "arts"];

async function scrapeAllCategories() {
    for (let category of categories) {
        console.log(`Scraping category: ${category}`);
        await News(category);
    }
}

cron.schedule("*/300 * * * *", async () => {
    console.log("Running scheduled news scrape");
    scrapeAllCategories();
});

app.use("/",router);

app.listen(5000, () => console.log("Server running on port 5000"));


