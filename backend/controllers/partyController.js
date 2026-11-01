
const mongoose = require("mongoose");

const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
    if (!Array.isArray(services) || !Number.isFinite(Number(budget))) {
        return null;
    }

    const prices = services.map((service) => Number(service?.price));

    if (!prices.every(Number.isFinite)) {
        return null;
    }

    const priceSum = prices.reduce((sum, price) => sum + price, 0);

    return priceSum <= Number(budget);
};

const partyController = {

    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            const hasEnoughBudget = checkPartyBudget(
                party.budget,
                party.services
            );

            if (hasEnoughBudget === false) {
                return res.status(406).json({
                    msg: "O seu orçamento é insuficiente."
                });
            }

            const response = await PartyModel.create(party);

            return res.status(201).json({
                response,
                msg: "Festa criada com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao criar festa:", error.message);

            if (
                error.name === "ValidationError" ||
                error.name === "CastError"
            ) {
                return res.status(400).json({
                    msg: "Dados inválidos.",
                    error: error.message
                });
            }

            return res.status(500).json({
                msg: "Erro interno ao criar festa."
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            return res.status(200).json(parties);

        } catch (error) {
            console.error("Erro ao buscar festas:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao buscar festas."
            });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de festa inválido."
                });
            }

            const party = await PartyModel.findById(id);

            if (!party) {
                return res.status(404).json({
                    msg: "Festa não encontrada."
                });
            }

            return res.status(200).json(party);

        } catch (error) {
            console.error("Erro ao buscar festa:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao buscar festa."
            });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de festa inválido."
                });
            }

            const deletedParty = await PartyModel.findByIdAndDelete(id);

            if (!deletedParty) {
                return res.status(404).json({
                    msg: "Festa não encontrada."
                });
            }

            return res.status(200).json({
                deletedParty,
                msg: "Festa excluída com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao excluir festa:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao excluir festa."
            });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de festa inválido."
                });
            }

            const existingParty = await PartyModel.findById(id);

            if (!existingParty) {
                return res.status(404).json({
                    msg: "Festa não encontrada."
                });
            }

            const budget = req.body.budget !== undefined
                ? req.body.budget
                : existingParty.budget;

            const services = req.body.services !== undefined
                ? req.body.services
                : existingParty.services;

            const hasEnoughBudget = checkPartyBudget(budget, services);

            if (hasEnoughBudget === false) {
                return res.status(406).json({
                    msg: "O seu orçamento é insuficiente."
                });
            }

            const party = {};

            const fields = [
                "title",
                "author",
                "description",
                "budget",
                "image",
                "services"
            ];

            fields.forEach((field) => {
                if (req.body[field] !== undefined) {
                    party[field] = req.body[field];
                }
            });

            const updatedParty = await PartyModel.findByIdAndUpdate(
                id,
                party,
                {
                    new: true,
                    runValidators: true
                }
            );

            return res.status(200).json({
                party: updatedParty,
                msg: "Festa atualizada com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao atualizar festa:", error.message);

            if (
                error.name === "ValidationError" ||
                error.name === "CastError"
            ) {
                return res.status(400).json({
                    msg: "Dados inválidos.",
                    error: error.message
                });
            }

            return res.status(500).json({
                msg: "Erro interno ao atualizar festa."
            });
        }
    }

};

module.exports = partyController;
