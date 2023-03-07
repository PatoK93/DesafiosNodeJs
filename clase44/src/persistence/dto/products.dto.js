export default class ProductsDTO {
  constructor({
    id,
    title,
    description,
    value,
    timestamp,
    photo,
    code,
    stock,
  }) {
    this.id = id;

    this.title = title;

    this.description = description;

    this.value = value;

    this.timestamp = timestamp;

    this.photo = photo;

    this.code = code;

    this.stock = stock;
  }
}

export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductsDTO(p));
  else return new ProductsDTO(prods);
}
