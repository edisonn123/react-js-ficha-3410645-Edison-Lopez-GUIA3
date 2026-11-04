/*
console.log("JavaScript listo para practicar");

function calcularTotal(precio, cantidad) {
    const total = precio * cantidad;
    return total;
}

const resultado = calcularTotal(5000, 3);
console.log("Resultado ejemplo")
console.log(resultado)

function calcularSuma(a,b) {
    const total = a + b;
    return total;
}

const resultadoSuma = calcularSuma(15,15);
console.log("Resultado suma")
console.log(resultadoSuma)

function calcularResta(a,b) {
    const total = a - b;
    return total;
}

const resultadoResta = calcularResta(10,5);
console.log("Resultado resta")
console.log(resultadoResta)

function calcularMultiplicacion(a,b) {
    const total = a * b;
    return total;
}

const resultadoMultiplicacion = calcularMultiplicacion(3,5);
console.log("Resultado multiplicacion")
console.log(resultadoMultiplicacion)

function calcularDivision(a,b) {
    const total = a / b;
    return total;
}

const resultadoDivision = calcularDivision(50,2);
console.log("Resultado division")
console.log(resultadoDivision)

function calcularPromedio(nota1,nota2,nota3) {
    const suma = nota1 + nota2 + nota3;
    const total = suma / 3;
    return total;
}

const resultadoPromedio = calcularPromedio(5.0,2.6,3.8);
console.log("Resultado promedio")
console.log(resultadoPromedio)
*/

// RESPUESTA A PREGUNTA DE LA GUIA
// La diferencia es que return es el que toma que datos devolver al usuario, dependiendo de las operaciones de una funcion
// Mientras que console.log() es el que se encarga de mostrar datos en la terminal

// FUNCIONES ARROW
/*
const aplicarIva = (precio) => {
    return precio * 1.19;
}
console.log("Resultado aplicar IVA")
console.log(aplicarIva(10))

const convertirCuadrado = (numero) => {
    return numero * numero;
}
console.log("Resultado cuadrado")
console.log(convertirCuadrado(2))

const mayorEdad = (edad) => {
    if (edad >= 18) {
        return "Eres mayor de edad"
    } else {
        return "Eres menor de edad"
    }
}
console.log("Resultado Edad")
console.log(mayorEdad(19))

const nombreCompleto = (nombre, apellido) => {
    return nombre + " " + apellido;
}
console.log("Resultado Nombre")
console.log(nombreCompleto("Edison","Lopez"))
*/

//ARREGLOS Y OBJETOS

const productos = [
    { id: 1, nombre: 'Mouse', precio: 50000, categoria: 'Perifericos', stock: 5 },
    { id: 2, nombre: 'Teclado', precio: 90000, categoria: 'Perifericos', stock: 0 },
    { id: 3, nombre: 'Monitor', precio: 650000, categoria: 'Pantallas', stock: 3 },
    { id: 4, nombre: 'Audifonos', precio: 120000, categoria: 'Perifericos', stock: 3 },
    { id: 5, nombre: 'Disco duro', precio: 90000, categoria: 'Almacenamiento', stock: 5 },
    { id: 6, nombre: 'USB', precio: 25000, categoria: 'Almacenamiento', stock: 10 },
    { id: 7, nombre: 'Mesa', precio: 200000, categoria: 'Muebles', stock: 8 },
    { id: 8, nombre: 'Parlantes', precio: 50000, categoria: 'Perifericos', stock: 9 },
    { id: 9, nombre: 'Estanteria', precio: 150000, categoria: 'Muebles', stock: 0 },
    { id: 10, nombre: 'Portatil', precio: 1800000, categoria: 'Dispositivos', stock: 12 }
]

// productos.forEach((producto, indice) => {
//     console.log(`${indice + 1}. ${producto.nombre} - $${producto.precio} - ${producto.stock}`);
// });


//RETO MAP()
// const nombres = productos.map(producto => producto.nombre);
// console.log(nombres);

// const preciosConIva = productos.map(producto => producto.precio * 1.19);
// console.log(preciosConIva);

// const nombresMayuscula = productos.map(producto => producto.nombre.toUpperCase());
// console.log(nombresMayuscula);

// const resumenProductos = productos.map(producto => producto.nombre + " cuesta " + producto.precio);
// console.log(resumenProductos); 

//RETO FILTER Y FIND
/*
console.log("Productos con mas de 0 de stock")
const disponibles = productos.filter(producto => producto.stock > 0);
console.log(disponibles)

console.log("Producto con ID 3")
const producto3 = productos.find(producto => producto.id === 3);
console.log(producto3)

console.log("Productos con precio mayor a 100.000")
const precioMayor = productos.filter(producto => producto.precio > 100000);
console.log(precioMayor)

console.log("Productos con precio entre 50 y 200 mil")
const precioMedio = productos.filter(producto => (producto.precio > 50000 & producto.precio < 200000));
console.log(precioMedio)

console.log("Productos con categoria MUEBLES")
const productosMuebles = productos.filter(producto => producto.categoria === "Muebles");
console.log(productosMuebles)

console.log("Producto con ID 5")
const producto5 = productos.find(producto => producto.id === 5);
console.log(producto5)

function buscarProducto(id) {
    return productos.find(producto => producto.id === id)
}
console.log("Producto buscando ID")
console.log(buscarProducto(9))
*/

//RETO SOME() EVERY() REDUCE()
/*
const hayAgotados = productos.some(producto => producto.stock === 0);
console.log("Hay productos agotados")
console.log(hayAgotados)

const productoMayor = productos.some(producto => producto.precio > 1000000);
console.log("Existen productos con precio mayor a 1.000.000")
console.log(productoMayor)

const productoMayor0 = productos.every(producto => producto.precio > 0);
console.log("Existen productos con precio mayor que 0")
console.log(productoMayor)

const stockValido = productos.every(producto => producto.stock >= 0);
console.log("Hay productos con stock mayor o igual a cero")
console.log(stockValido)

const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * producto.stock,
    0
);
console.log("Precio del inventario")
console.log(valorInventario)
*/

// RETO JAVASCRIPT MODERNO
/*
// TEMPLATE LITERALS
console.log(`El producto ${productos[2].nombre} cuesta $${productos[2].precio}`);

// DECONSTRUCCION
const { nombre, precio, stock } = productos[2];
console.log(nombre, precio, stock);

// SPREAD 
const productoActualizado = {
    ...productos[2],
    stock: 8
}

// OPERADOR TERNARIO
const estado = productoActualizado.stock > 0 ? 'Disponible' : 'Agotado';
console.log(estado);
*/

// TAREA DE CREAR COPIA
/*
const productoActualizado1 = {
    ...productos[3],
    precio: 350000,
    stock: 10
}

console.log(`El producto el ${productos[3].nombre} cuesta $${productos[3].precio} y tiene un stock de ${productos[3].stock}`);

const estado = productoActualizado1.stock > 0 ? 'Producto en venta' : 'Producto agotado';
console.log(estado);
*/
