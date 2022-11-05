import express from "express";
import mainRouter from "../routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../classes/product.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

// app.get("/", async (req, res) => {
//   const fileName = "products.json";
//   const file = new Product(fileName);
//   let productArray = file.getAll();
//   res.render("Products", { productArray });
// });

app.use("/api", mainRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} no implementada`,
  });
});

export default app;
