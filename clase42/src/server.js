import express from "express";
import cors from "cors";
import apiRoutes from "./routes/products.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

const PORT = 8080;

const server = app.listen(PORT, () =>
  console.info(`Server iniciado en http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

export default app;
