require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/conn");
const routes = require("./routes/router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor online na porta ${PORT}!`);
        });

    } catch (error) {
        console.error("Não foi possível iniciar o servidor:", error.message);
        process.exit(1);
    }
}

startServer();