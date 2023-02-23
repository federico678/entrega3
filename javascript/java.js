
class Collar {
    constructor(collar) {
        this.id = collar.id;
        this.tipo = collar.tipo;
        this.precio = collar.precio;
        this.cantidad = collar.cantidad;
        this.precioTotal = collar.precio;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}

//función de imprimir productos

function imprimirProductosEnHTML(array) {
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
//creamos cada card:
    for (const collar of array) {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="card text-center" style="width: 28rem;">
            <div class="card-body">
                <img src="${collar.img}" id="card1" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${collar.tipo}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${collar.descripcion}</h5>
                <p class="card-text">$${collar.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${collar.tipo}${collar.id}" type="button" class="btn btn-dark"> Agregar al carrito </button>
                </div>
            </div>
        </div>      
        `;
        //agregamos la card al contenedor de html
        contenedor.appendChild(card);

        let boton = document.getElementById(`agregar${collar.tipo}${collar.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(collar));
    }
}
//función: agregar al carrito

function agregarAlCarrito(producto) {
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    console.log({ index });

    if (index != -1) {
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        let collar = new Collar(producto);
        collar.cantidad = 1;
        carrito.push(collar);
    }

    //storage y contenido de la tabla
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}
//función eliminar del carrito
function eliminarDelCarrito(id) {
    let index = carrito.findIndex((element) => element.id === id);

    if (carrito[index].cantidad > 1) {
       
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
       
        carrito.splice(index, 1);
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

//función precio total

function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

//función imprimir tabla
function imprimirTabla(array) {
    let contenedor = document.getElementById("tabla-carrito");
    contenedor.innerHTML = "";

//div que contendrá la tabla
    let tabla = document.createElement("div");

// A ese div le agregaremos todos los datos de la tabla

    tabla.innerHTML = `

        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">

            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    // Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
    // donde imprimiremos los datos del array
    let bodyTabla = document.getElementById("bodyTabla");

    for (let collar of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${collar.tipo}</td>
                <td>${collar.cantidad}</td>
                <td>$${collar.precioTotal}</td>
                <td><button id="eliminar${collar.id}" class="btn btn-dark">Eliminar</button></td>
      `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${collar.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(collar.id));
    }

    let precioTotal = obtenerPrecioTotal(array);
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

//función fultrar búsqueda
function filtrarBusqueda(e) {
    e.preventDefault();


    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = collares.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    // Si existe la key buscada en el storage nos traemos
    // los datos para recuperarlos y poder visualizarlos en pantalla
    if (contenidoEnStorage) {

        let array = [];

        for (const objeto of contenidoEnStorage) {

            let collar = new Collar(objeto);
            collar.actualizarPrecioTotal();
            array.push(collar);
        }

        imprimirTabla(array);

        return array;
    }

    return [];
}

//EVENTO
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// contenido de las cards
const collares = [
    {
        id: 0,
        tipo: "collar piedra turmalina",
        descripcion: "piedra importada de canadá",
        precio: 1000,
        img:"https://images.unsplash.com/photo-1612011213611-ff46ab689475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29sbGFyJTIwZm9uZG8lMjBuZWdyb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" ,
    },
    {
        id: 1,
        tipo: "collar piedra sodalita",
        descripcion: "piedra extraída del himalaya",
        precio: 4000,
        img: "https://media.istockphoto.com/id/183256707/es/foto/medall%C3%B3n.jpg?b=1&s=170667a&w=0&k=20&c=a97XeD-PBJWzOGuq3PrFMV6rsnCUtoXlVGGHHM76omc=",
    },
    {
        id: 2,
        tipo: "collar perlado blanco",
        descripcion: "perlas blancas",
        precio: 4000,
        img: "https://media.istockphoto.com/id/146964088/es/foto/collar-de-perlas.jpg?b=1&s=170667a&w=0&k=20&c=DRIXCKpgSd6dtGtHcocDEtIJtddkGRHsNlFVs6FPvD0=",
    },
    {
        id: 3,
        tipo: "collar cruz gris",
        descripcion: "cruz esmaltada",
        precio: 4000,
        img:"https://media.istockphoto.com/id/1317000650/es/foto/rezando-con-un-rosario-mano-del-hombre-cat%C3%B3lico-con-rosario-sobre-fondo-negro-manos.jpg?b=1&s=170667a&w=0&k=20&c=dP9WclUo82EBmn0P2F-qPUfW-DnSUBf7mT6UZSql3JY=",
    },
    {
        id: 4,
        tipo: "collar piedra shunguita",
        descripcion: "piedra rusa",
        precio: 1500,
        img: "https://media.istockphoto.com/id/1248439812/es/foto/collar-de-diamantes-aislado-sobre-fondo-negro.jpg?s=612x612&w=0&k=20&c=lN5s7vnlwie-Kqun7KY0UA06I1-dTKI8-s5SEZyCZhs=",
    },
    {
        id: 5,
        tipo: "collar cuarzo rosado",
        descripcion: "cristales de cuarzo importados",
        precio: 1900,
        img: "https://media.istockphoto.com/id/1389835394/es/foto/hermoso-colgante-morganita-en-oro-con-una-cadena-sobre-un-fondo-negro.jpg?s=612x612&w=0&k=20&c=3IlcR9QfJUalMCdkH8xRGDAnHz4I_Dya3a5s_O8kIdE=",
    },
];



imprimirProductosEnHTML(collares);

let carrito = chequearCarritoEnStorage();
