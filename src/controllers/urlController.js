const crypto = require("crypto");
const Url = require("../models/Url");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        message: "Please provide a valid URL",
      });
    }

    const shortCode = crypto.randomBytes(4).toString("hex");

    const url = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createShortUrl,
};