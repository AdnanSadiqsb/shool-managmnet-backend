const express = require("express");
const connectionDB = require("./db/connection")
require("dotenv").config();
const authRouter = require("./routes/auth");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  //   optionSuccessStatus: 200,
};

const app = express();
const PORT = 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/', authRouter);

const start = async () => {
    connectionDB(process.env.MONGO_URI);
    app.listen( process.env.PORT|| PORT, () => {
        console.log("Server is listening on port " + PORT);
    })
}

start();