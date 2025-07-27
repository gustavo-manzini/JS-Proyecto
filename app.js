const productos = [
    { nombre: "harina", precio: 25, esencial: false },
    { nombre: "galletas", precio: 70, esencial: true },
    { nombre: "pan", precio: 10, esencial: false },
    { nombre: "leche", precio: 40, esencial: true },
    { nombre: "gaseosa", precio: 150, esencial: fals },
];

class CarritoDeCompras {
    constructor() {
        this.items = [];
    }

    agregarProducto(producto, unidades) {
        this.items.push({ producto, unidades });
    }

    buscarProducto(nombre) {
        return this.items.find(item => item.producto.nombre === nombre);
    }

    filtrarPorPrecio(minPrecio, maxPrecio) {
        return this.items.filter(item => item.producto.precio >= minPrecio && item.producto.precio <= maxPrecio);
    }

    tieneProductosEsenciales() {
        return this.items.some(item => item.producto.esencial);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + (item.producto.precio * item.unidades), 0);
    }
}

let carrito = new CarritoDeCompras();

function mostrarProductosDisponibles() {
    alert("A continuación la lista de productos:");
    let listaProductos = productos.map(producto => `${producto.nombre} $${producto.precio}`);
    alert(listaProductos.join(" - "));
}

function agregarProductoAlCarrito(producto) {
    let unidades = parseInt(prompt(`¿Cuántas unidades desea llevar?`));
    carrito.agregarProducto(producto, unidades);
}

let seleccion = prompt("Hola, ¿desea comprar algo? si o no");

while (seleccion !== "si" && seleccion !== "no") {
    alert("Por favor, ingrese si o no.");
    seleccion = prompt("Hola, ¿desea comprar algo? si o no");
}

if (seleccion === "si") {
    mostrarProductosDisponibles();
} else {
    alert("Gracias por venir, hasta pronto!");
}

while (seleccion !== "no") {
    let producto = prompt("Agregue un producto al carrito:");
    let encontrado = productos.find(item => item.nombre === producto);

    if (encontrado) {
        agregarProductoAlCarrito(encontrado);
    } else {
        alert("Lo siento, ese producto no está disponible.");
    }

    seleccion = prompt("¿Quiere seguir comprando?");

    if (seleccion === "no") {
        if (!carrito.tieneProductosEsenciales()) {
            alert("Por favor, asegúrese de incluir al menos un producto esencial en su compra:");
            mostrarProductosDisponibles();
            let productoEsencial = prompt("Seleccione un producto esencial:");
            let encontrado = productos.find(item => item.nombre === productoEsencial && item.esencial);
            if (encontrado) {
                agregarProductoAlCarrito(encontrado);
                seleccion = "si"; // Reiniciar el ciclo para permitir al usuario agregar más productos o finalizar la compra.
                continue;
            } else {
                alert("El producto seleccionado no es esencial.");
            }
        }
        alert("Gracias por tu compra.");
        carrito.items.forEach(item => {
            console.log(`Producto: ${item.producto.nombre}, Unidades: ${item.unidades}, Total a pagar: $${item.producto.precio * item.unidades}`);
        });
    }
}

console.log(`El total a pagar es: $${carrito.calcularTotal()}`);
