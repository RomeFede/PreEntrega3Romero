//Login

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        fetch("./usuarios.json")
            .then((response) => response.json())
            .then((data) => {
                const users = data.users;
                const user = users.find((user) => user.username === username && user.password === password);
                if (user) {
                    window.location.href = "./pages/productos.html";
                } else {
                    alert("Credenciales incorrectas. Inténtelo de nuevo.");
                }
            })
            .catch((error) => {
                console.error("Error al cargar los usuarios:", error);
            });
    });
});

//productos
class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productos = [
    new Producto("Muzzarella", 3800, "../imagenes/mozzarella.jpg"),
    new Producto("Napolitana", 4000, "../imagenes/napo.webp"),
    new Producto("Anchoas", 4100, "../imagenes/pizza-anchoas.jpg"),
    new Producto("Veggie", 4200, "../imagenes/pizza_veggie.jpg"),
    new Producto("Jamon y huevo", 4000, "../imagenes/pizza-huevoyj.jpeg"),
    new Producto("Jamon y morrón", 4500, "../imagenes/pizza_jym.jpg"),
    new Producto("Fugazzeta rellena", 5000, "../imagenes/pizza-fugarellena2.jpg"),
    new Producto("Tropical", 4500, "../imagenes/pizza-tropical.jpg"),
    new Producto("Cuatro Quesos", 4900, "../imagenes/pizza-cuatroquesos.jpg"),
];

const calcularTotal = (cantidad, precio) => cantidad * precio;

const productosContainer = document.querySelector('.productos');
const carritoLista = document.querySelector('.carrito-lista');
const totalElement = document.getElementById('total');
const finalizarCompraButton = document.getElementById('finalizar-compra');

function mostrarProductos() {
    productosContainer.innerHTML = productos.map((producto, index) => `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span>${producto.nombre} - $${producto.precio}</span>
            <input type="number" class="cantidad" min="1" value="1">
            <button class="agregar-carrito" data-index="${index}">Agregar al carrito</button>
        </div>
    `).join('');
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoLista.innerHTML = carrito.map((item, index) => `
        <li>
            <img src="${item.imagen}" alt="${item.nombre}" class="miniatura">
            ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        </li>
    `).join('');

    const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    totalElement.textContent = total;
}
function agregarAlCarrito(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        const index = parseInt(event.target.dataset.index);
        const cantidad = parseInt(event.target.previousElementSibling.value);
        const productoSeleccionado = productos[index];
        const subtotal = calcularTotal(cantidad, productoSeleccionado.precio);

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({
            nombre: productoSeleccionado.nombre,
            cantidad: cantidad,
            subtotal: subtotal,
            imagen: productoSeleccionado.imagen
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();
    }
}

function eliminarDelCarrito(event) {
    if (event.target.classList.contains('eliminar-producto')) {
        const index = parseInt(event.target.dataset.index);

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();
    }
}

function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {

        Swal.fire({
            icon: 'success',
            title: 'Gracias por su compra',
            text: 'Su envio esta en camino!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "orangered",
        }).then((result) => {

            if (result.isConfirmed) {

            }
        });

        localStorage.removeItem("carrito");
        actualizarCarrito();
    } else {

        Swal.fire({
            icon: 'warning',
            title: 'El carrito está vacío',
            text: 'Por favor agregue productos antes de finalizar la compra.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "orangered",
        });
    }
}

mostrarProductos();
actualizarCarrito();
productosContainer.addEventListener('click', agregarAlCarrito);
carritoLista.addEventListener('click', eliminarDelCarrito);
finalizarCompraButton.addEventListener('click', finalizarCompra);





