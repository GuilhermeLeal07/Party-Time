const mongoose = require("mongoose");

const { Service: ServiceModel } = require("../models/Service");

const serviceController = {

    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const response = await ServiceModel.create(service);

            return res.status(201).json({
                response,
                msg: "Serviço criado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao criar serviço:", error.message);

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    msg: "Dados inválidos.",
                    error: error.message
                });
            }

            return res.status(500).json({
                msg: "Erro interno ao criar serviço."
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find();

            return res.status(200).json(services);

        } catch (error) {
            console.error("Erro ao buscar serviços:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao buscar serviços."
            });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de serviço inválido."
                });
            }

            const service = await ServiceModel.findById(id);

            if (!service) {
                return res.status(404).json({
                    msg: "Serviço não encontrado."
                });
            }

            return res.status(200).json(service);

        } catch (error) {
            console.error("Erro ao buscar serviço:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao buscar serviço."
            });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de serviço inválido."
                });
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id);

            if (!deletedService) {
                return res.status(404).json({
                    msg: "Serviço não encontrado."
                });
            }

            return res.status(200).json({
                deletedService,
                msg: "Serviço excluído com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao excluir serviço:", error.message);

            return res.status(500).json({
                msg: "Erro interno ao excluir serviço."
            });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    msg: "ID de serviço inválido."
                });
            }

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const updatedService = await ServiceModel.findByIdAndUpdate(
                id,
                service,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedService) {
                return res.status(404).json({
                    msg: "Serviço não encontrado."
                });
            }

            return res.status(200).json({
                service: updatedService,
                msg: "Serviço atualizado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao atualizar serviço:", error.message);

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    msg: "Dados inválidos.",
                    error: error.message
                });
            }

            return res.status(500).json({
                msg: "Erro interno ao atualizar serviço."
            });
        }
    }

};

module.exports = serviceController;