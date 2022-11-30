const express = require("express");
const connectionDB = require("./db/connection")
require("dotenv").config();
const authRouter = require("./routes/auth");
const studentRouter = require("./routes/student");
const classRouter = require("./routes/class");
const sectionRouter = require("./routes/section");
const feeRouter = require("./routes/fee");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  //   optionSuccessStatus: 200,
};

const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.get('/',(req,res)=>
  res.send("connected to nodejs")
)

app.use('/api/v1/', authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/fee", feeRouter);

const start = async () => {
    await connectionDB(process.env.MONGO_URI);
    app.listen( process.env.PORT|| port, () => {
        console.log("Server is listening on port " + port);
    })
}

start();