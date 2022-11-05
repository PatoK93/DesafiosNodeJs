import fs from "fs";

class Product {
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

  async updateProduct(id, body, productArray) {
    let flagUpdate = false;
    try {
      productArray.forEach((product) => {
        if (product.id === id) {
          product.timestamp = body.timestamp;
          product.title = body.title;
          product.description = body.description;
          product.code = body.code;
          product.photo = body.photo;
          product.value = body.value;
          product.stock = body.stock;
          flagUpdate = true;
        }
      });
      await this.saveProducts(productArray);
      if (!flagUpdate) {
        throw "No existe el producto solicitado!";
      }
    } catch (error) {
      throw error;
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
        "Hubo un problema al buscar el producto solicitado!",
        error
      );
    }
  }

  async saveProduct(data) {
    if (
      !data.timestamp ||
      !data.title ||
      !data.description ||
      !data.code ||
      !data.photo ||
      !data.value ||
      !data.stock ||
      typeof data.timestamp !== "string" ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      typeof data.code !== "string" ||
      typeof data.photo !== "string" ||
      typeof data.value !== "number" ||
      typeof data.stock !== "number"
    )
      throw new Error("Datos inválidos!");

    try {
      const products = await this.getAll();
      let id = 1;
      if (products.length) {
        id = products[products.length - 1].id + 1;
      }

      const newProduct = {
        id: id,
        timestamp: data.timestamp,
        title: data.title,
        description: data.description,
        code: data.code,
        photo: data.photo,
        value: data.value,
        stock: data.stock,
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

export default Product;
