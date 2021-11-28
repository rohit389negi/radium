const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema(
  {
    symbol: { type: String, unique: true }, 
    name: { type: String, unique: true },
    marketCapUsd: String,
    priceUsd: String,
    changePercent24Hr: String

  },
  { timestamps: true }
);

module.exports = mongoose.model("Crypto", cryptoSchema);

