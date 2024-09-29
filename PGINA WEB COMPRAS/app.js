// Variables para manejar el carrito
let carrito = [];
const productos = [
    { id: 1, nombre: "Producto 1", precio: 10 },
    { id: 2, nombre: "Producto 2", precio: 20 }
];

// Seleccionar elementos del DOM
const carritoContenido = document.getElementById("carrito-contenido");
const botonesAgregar = document.querySelectorAll("button[data-id]");
const botonVaciar = document.getElementById("vaciar-carrito");

// Cargar el carrito desde localStorage (si existe)
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
});

// Función para agregar productos al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const idProducto = parseInt(boton.getAttribute("data-id"));
        const producto = productos.find(prod => prod.id === idProducto);

        // Si el producto ya está en el carrito, aumentamos la cantidad
        const productoEnCarrito = carrito.find(prod => prod.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Guardar carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    });
});

// Función para eliminar productos del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoContenido.appendChild(div);
    });

    // Añadir funcionalidad para los botones de eliminar
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.getAttribute("data-id"));
            eliminarDelCarrito(idProducto);
        });
    });
}

// Función para vaciar todo el carrito
botonVaciar.addEventListener('click', () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});