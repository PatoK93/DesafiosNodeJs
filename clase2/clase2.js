class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return console.log(
      `El nombre completo del usuario es: ${this.nombre} ${this.apellido}`
    );
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  getCantidadMascotas(cantMascotas) {
    return console.log(`Tiene ${cantMascotas} mascotas`);
  }

  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }

  getBookNames() {
    let arrayNombreLibros = [];
    this.libros.forEach((libro) => arrayNombreLibros.push(libro.nombre));
    return arrayNombreLibros;
  }

  showBookNames(nombreLibros) {
    nombreLibros.forEach((nombre) => {
      console.log(`El nombre del libro es: ${nombre}`);
    });
  }
}

const usuario = new Usuario(
  "Patricio",
  "Kanaszyc",
  [
    { nombre: "El señor de las moscas", autor: "William Golding" },
    { nombre: "Fundacion", autor: "Isaac Asimov" },
  ],
  ["perro", "gato", "loro"]
);

//test Usuario

usuario.getFullName();
usuario.addMascota("hamster");
let cantMascotas = usuario.countMascotas();
usuario.getCantidadMascotas(cantMascotas);
usuario.addBook("Harry Potter", "J.K.Rowling");
let arrayNombreLibros = usuario.getBookNames();
usuario.showBookNames(arrayNombreLibros);
