const shortid = require("shortid");
const URL = require("../models/url");

const createShortUrl = async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(400).json({
        error: "URL is required !",
      });
    }
    const shortID = shortid();
    const newURL = new URL({
      shortId: shortID,
      redirectURL: req.body.url,
      visitHistory: [],
    });
    await newURL.save();
    console.log(shortID);
    res.status(201).json({ id: shortID, longUrl: newURL.redirectURL });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const getHistory = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({
        error: "Not Found!",
      });
    }
    res.status(201).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createShortUrl,
  getRedirectUrl,
  getHistory,
};
