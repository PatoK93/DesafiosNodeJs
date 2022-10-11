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
    return console.log(`Tiene ${this.mascotas.length} mascotas`);
  }

  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }

  getBookNames() {
    return console.log(
      `El nombre del libro es: ${this.libros.map((book) => book.nombre)}`
    );
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
usuario.countMascotas();
usuario.addBook("Harry Potter", "J.K.Rowling");
usuario.getBookNames();
