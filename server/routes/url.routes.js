const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  getRedirectUrl,
  getHistory,
} = require("../controllers/url.controller");

router.post("/", createShortUrl);
router.get("/:shortId", getRedirectUrl);
router.get("/analytics/:shortId", getHistory);

module.exports = router;
