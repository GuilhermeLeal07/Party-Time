const mongoose = require("mongoose");

const { Schema } = mongoose;

const { serviceSchema } = require("./Service");

const partySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        budget: {
            type: Number,
            required: true,
            min: [0, "O orçamento não pode ser negativo."],
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        services: {
            type: [serviceSchema],
        },
    },
    { timestamps: true }
);

const Party = mongoose.model("Party", partySchema);

module.exports = Party;