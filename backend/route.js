const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ Fast API: Fetch news from the database

router.get("/article/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let category = req.query.category;
        if(category==="future-planet"){
            category="earth"
        }
        const news = await prisma[category]?.findUnique({
            where: { id: id },
            // take: 20,
        });
        res.status(200).json(news);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/news", async (req, res) => {
    try {
        const news = await prisma.news.findMany({
            orderBy: { timestamp: "desc" },
            // take: 30,
        });
        res.status(200).json(news);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/business", async (req, res) => {
    try {
        const business = await prisma.business.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(business);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/innovation", async (req, res) => {
    try {
        const innovation = await prisma.innovation.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(innovation);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/culture", async (req, res) => {
    try {
        const culture = await prisma.culture.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(culture);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/future-planet", async (req, res) => {
    try {
        const earth = await prisma.earth.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(earth);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});


router.get("/travel", async (req, res) => {
    try {
        const travel = await prisma.travel.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(travel);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});



router.get("/arts", async (req, res) => {
    try {
        const arts = await prisma.arts.findMany({
            orderBy: { timestamp: "desc" },
            // take: 20,
        });
        res.status(200).json(arts);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// router.get("/search", async (req, res) => {
//     try {
//         const query = req.query.q;
//         const arts = await prisma.news.findMany({
//             where: {},
//             // take: 20,
//         });
//         res.status(200).json(arts);
//     } catch (error) {
//         console.error("❌ Error fetching news:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// });

module.exports = router;
