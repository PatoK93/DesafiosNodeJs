const socketIo = require("socket.io");
const { productObj, productArray } = require("../classes/product");

const data = {
  title: undefined,
  value: undefined,
  thumbnail: undefined,
};

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
      socket.emit("Welcome", "Bienvenido!");
    });

    //Listen for new product
    socket.on("addProduct", (newProduct) => {
      data.title = newProduct.title;
      data.value = newProduct.value;
      data.thumbnail = newProduct.thumbnail;
      productObj.saveProduct(data, productArray);
      io.emit("LastProduct", productArray[productArray.length - 1]);
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};
