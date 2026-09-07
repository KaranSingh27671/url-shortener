const Url = require("../models/Url");
const redisClient = require("../config/redis");

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
      await Url.findOneAndUpdate(
        { shortCode },
        { $inc: { clicks: 1 } }
      );

      return res.redirect(cachedUrl);
    }

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    await redisClient.set(shortCode, url.originalUrl);

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  redirectUrl,
};