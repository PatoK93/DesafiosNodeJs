const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async validateExistFile() {
    try {
      await fs.promises.stat(this.fileName);
      return true;
    } catch (error) {
      console.log("El archivo no existe! Creandolo...");
      await fs.promises.writeFile(this.fileName, JSON.stringify([]));
      return false;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los productos!", error);
    }
  }

  async saveProducts(products) {
    try {
      const data = JSON.stringify(products, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los productos!", error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const index = products.findIndex((product) => product.id === id);
      if (index < 0) {
        throw new Error("El producto buscado no existe!");
      }
      return products[index];
    } catch (error) {
      throw new Error(
        "ubo un problema al buscar el producto solicitado!",
        error
      );
    }
  }

  async saveProduct(data) {
    if (
      !data.title ||
      !data.price ||
      !data.thumbnail ||
      typeof data.title !== "string" ||
      typeof data.price !== "number" ||
      typeof data.thumbnail !== "string"
    )
      throw new Error("Datos inválidos!");

    try {
      const products = await this.getAll();
      let id = 1;
      if (products.length) {
        id = products[products.length - 1].id + 1;
      }

      const newProduct = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        id: id,
      };

      products.push(newProduct);

      await this.saveProducts(products);
    } catch (error) {
      throw new Error(
        "Hubo un problema al guardar el producto solicitado!",
        error
      );
    }
  }

  async deleteAll() {
    try {
      await this.saveProducts([]);
    } catch (error) {
      throw new Error("Hubo un problema al borrar todos los productos!", error);
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();

      const index = products.findIndex((product) => product.id === id);

      if (index < 0) {
        throw new Error("El producto a eliminar no existe!");
      }

      products.splice(index, 1);

      await this.saveProducts(products);
    } catch (error) {
      throw new Error(
        "Hubo un problema al borrar el producto indicado!",
        error
      );
    }
  }
}

module.exports = Contenedor;
