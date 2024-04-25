import express from "express";
import connect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connect();

connection.on("error", (erro) => {
    console.error("Error to connect to database", erro);
})

connection.once("open", () =>{
    console.log("Connected to database");
})

const app = express();
routes(app);

export default app;