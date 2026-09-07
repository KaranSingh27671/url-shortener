const express = require("express");
const { getUrlAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/:shortCode", getUrlAnalytics);

module.exports = router;