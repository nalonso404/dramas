const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    round: {
        type: Number,
        default: 1
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    enemy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userLife: {
        type: Number
    },
    userAttack: {
        type: Number
    },
    enemyLife: {
        type: Number
    },
    enemyAttack: {
        type: Number
    },
    preguntas: {
        type: Array
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;