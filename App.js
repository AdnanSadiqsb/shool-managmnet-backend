const express = require("express");
const connectionDB = require("./db/connection")
// require("dotenv").config();
const authRouter = require("./routes/auth");

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
  res.send("cennected to nodejs")
)
app.use('/api/v1/', authRouter);

const start = async () => {
    connectionDB("mongodb+srv://adnansadiq:fa19bse036@cluster0.v1frm.mongodb.net/schoolmanagmnet?authSource=admin&replicaSet=atlas-8p440y-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
    app.listen( process.env.PORT|| port, () => {
        console.log("Server is listening on port " + PORT);
    })
}

start();