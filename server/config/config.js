require("dotenv").config();
console.log(process.env.DB_URL);

const dev = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    url: process.env.DB_URL,
  },
};

module.exports = dev;

// || "mongodb://127.0.0.1:27017/urlDB"
