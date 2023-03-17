
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
    console.log({ index });swal("el producto se ha agregado al carrito")

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
    ;
    swal("El producto se ha eliminado correctamente!", ".", "success");
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
    swal("el carrito se ha vaciado correctamente!");
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
        <button id="pagar1" onclick="pagar()" class="btn btn-dark">Ir a pagar</button>
        <button id="registro1" onclick="registro1()" class="btn btn-dark">información adicional</button>
        
        `;

      //OFERTAS: FETCH

      const button1 = document.getElementById("registro1")
      button1.addEventListener("click",()=>{

        button1.disabled='true';
      
        const lista = document.querySelector('#listado');

        fetch('/data.json')
            .then( (res) => res.json())
            .then( (data) => {
        
                data.forEach((productos) => {
                    const li = document.createElement('li')
                    li.innerHTML = `
                        <h4>${productos.nombre}</h4>
                        <p id="p1">${productos.descripcion}</p>
                        <img id="ft" src="${productos.img}"
                        <hr/>
                        <hr>
                    `
                    lista.append(li)
                
                  
                })
            })
        
})



        //botón de pago
        let botonPagar =document.getElementById("pagar1");
        botonPagar.addEventListener("click",()=>{Toastify({
        text: "CLICK AQUÍ PARA CONTINUAR CON EL PAGO",
        onClick: function pagar() {
            let formpagar = document.getElementById("formpagar");
            formpagar.innerHTML =` <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
              <label for="validationCustom01" class="form-label">Nombre: </label>
              <input type="text" class="form-control" id="validationCustom01" value="" required>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-4">
              <label for="validationCustom02" class="form-label">Apellido: </label>
              <input type="text" class="form-control" id="validationCustom02" value="" required>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-4">
              <label for="validationCustomUsername" class="form-label">código postal: </label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend"></span>
                <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
                <div class="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom03" class="form-label">ciudad: </label>
              <input type="text" class="form-control" id="validationCustom03" required>
              <div class="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div class="col-md-3">
              <label for="validationCustom04" class="form-label">medio de pago:</label>
              <select class="form-select" id="validationCustom04" required>
                
                <option>Tarjeta de Débito</option>
                <option>Tarjeta MasterCard</option>
                <option>Tarjeta Visa</option>
                <option>...</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div class="col-md-3">
              <label for="validationCustom05" class="form-label">Código de tarjeta: </label>
              <input type="text" class="form-control" id="validationCustom05" required>
              <div class="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
            <div class="col-md-3">
            <label for="validationCustom05" class="form-label">número de la tarjeta: </label>
            <input type="text" class="form-control" id="validationCustom05" required>
            <div class="invalid-feedback">
              Please provide a valid zip.
            </div>
          </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                <label class="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit">PAGAR</button>
            </div>
          </form>` ;},
        offset: {
          x: 360, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 390 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();} )
    ;
}


//función fultrar búsqueda
function filtrarBusqueda(e) {
    e.preventDefault();


    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = collares.filter((elemento) => elemento.tipo.toLowerCase().includes(ingreso));

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
