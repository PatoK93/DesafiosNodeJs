const { Router } = require("express");
const productoRouter = require("./producto");

const router = Router();

router.use("/producto", productoRouter);

module.exports = router;
