const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, "O preço não pode ser negativo."],
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
    Service,
    serviceSchema,
};