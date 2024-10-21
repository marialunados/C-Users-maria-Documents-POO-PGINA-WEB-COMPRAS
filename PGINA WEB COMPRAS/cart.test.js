const chai = require('chai');
const expect = chai.expect; // Para hacer las aserciones
const Carrito = require('../carrito'); // Importa la clase Carrito

describe('Carrito de Compras', () => {
  let carrito;
  const producto1 = { id: 1, nombre: "Producto 1", precio: 10 };
  const producto2 = { id: 2, nombre: "Producto 2", precio: 20 };

  beforeEach(() => {
    carrito = new Carrito(); // Crea una nueva instancia del carrito antes de cada prueba
  });

  it('debería agregar un producto al carrito', () => {
    carrito.agregarProducto(producto1);
    
    expect(carrito.obtenerCarrito()).to.have.lengthOf(1); // El carrito debería tener 1 producto
    expect(carrito.obtenerCarrito()[0].nombre).to.equal('Producto 1');
    expect(carrito.obtenerCarrito()[0].cantidad).to.equal(1); // Cantidad inicial debe ser 1
  });

  it('debería aumentar la cantidad si el producto ya existe en el carrito', () => {
    carrito.agregarProducto(producto1);
    carrito.agregarProducto(producto1); // Agregamos el mismo producto de nuevo

    expect(carrito.obtenerCarrito()).to.have.lengthOf(1); // Solo 1 producto, pero la cantidad aumenta
    expect(carrito.obtenerCarrito()[0].cantidad).to.equal(2); // La cantidad debe ser 2
  });

  it('debería eliminar un producto del carrito', () => {
    carrito.agregarProducto(producto1);
    carrito.agregarProducto(producto2);
    
    carrito.eliminarProducto(producto1.id); // Elimina el primer producto

    expect(carrito.obtenerCarrito()).to.have.lengthOf(1); // Solo queda 1 producto en el carrito
    expect(carrito.obtenerCarrito()[0].nombre).to.equal('Producto 2');
  });

  it('debería vaciar el carrito', () => {
    carrito.agregarProducto(producto1);
    carrito.vaciarCarrito(); // Vacía el carrito
    
    expect(carrito.obtenerCarrito()).to.have.lengthOf(0); // El carrito debería estar vacío
  });
});