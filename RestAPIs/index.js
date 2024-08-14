import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/Users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("Hello from Home Page"));

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
