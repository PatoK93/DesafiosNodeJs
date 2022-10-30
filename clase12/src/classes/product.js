class Product {
  constructor(id, title, value, thumbnail) {
    this.id = id || null;
    this.title = title || null;
    this.value = value || null;
    this.thumbnail = thumbnail || null;
  }

  saveProduct(body, prodcutArray) {
    try {
      let id = 1;
      if (prodcutArray.length) {
        id = prodcutArray[prodcutArray.length - 1].id + 1;
      }

      const newProdcut = {
        id: id,
        title: body.title,
        value: body.value,
        thumbnail: body.thumbnail,
      };

      prodcutArray.push(newProdcut);
    } catch (error) {
      throw new Error("Problems during product saving!", error);
    }
  }
}

const productObj = new Product();

const productArray = [
  new Product(
    1,
    "auto",
    100,
    "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-sedan-azul-coche-generico-objeto-color-vehiculo-transporte-auto-contemporaneo-transporte-personal-moderno-automovil-urbano-sobre-fondo-blanco_151150-2409.jpg?w=2000"
  ),
  new Product(
    2,
    "moto",
    200,
    "https://img.freepik.com/vector-gratis/ilustracion-motocicleta-color-rojo_1308-35859.jpg?w=2000&t=st=1665714076~exp=1665714676~hmac=154aad3cdb7fd71c793d80f3a85f905f4ec3d551e93fadf10ba36286b201b786"
  ),
  new Product(
    3,
    "camion",
    300,
    "https://img.freepik.com/vector-gratis/camion-reparto-caja-grande_1284-44424.jpg?w=1380&t=st=1665714104~exp=1665714704~hmac=a0717b4f1a05e301cfa488e81b49862f6e50af715786b469f3e42ac27012fd2a"
  ),
];

module.exports = {
  productObj,
  productArray,
};
