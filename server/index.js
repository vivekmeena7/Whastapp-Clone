import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import bodyParser from "body-parser";

import Connection from "./database/db.js"; //On server side it is compulsory to write .js after db file

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
Connection();

app.use("/", route);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The server is now running on PORT: ${PORT}`);
});
