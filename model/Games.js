// model/Games.js
const { Schema: _Schema, models, model } = require("mongoose");

const Schema = _Schema;

const GamesSchema = new Schema({
  name: { type: String, unique: true },
  category: String,
  profile: String,
  gameBannerPhoto: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
});

const Game = models.Games || model("Games", GamesSchema);

module.exports =  Games;
