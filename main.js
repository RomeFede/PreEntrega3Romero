alert("Bienvenidos a LibreMercado"); 

class Procesadores { 
    constructor(marca, modelo, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
};

const Productos = () => {
    const productosCargados = [];
    productosCargados.push(new Procesadores("AMD", "Ryzen 3", 81000));
    productosCargados.push(new Procesadores("AMD", "Ryzen 5", 178000));
    productosCargados.push(new Procesadores("AMD", "Ryzen 7", 252800));
    productosCargados.push(new Procesadores("Intel", "I3", 79000));
    productosCargados.push(new Procesadores("Intel", "I5", 146000));
    productosCargados.push(new Procesadores("Intel", "I7", 210400));
    return productosCargados;
};

const compraOVenta = () => { 
    let venderOComprar = prompt("Quieres vender o comprar procesadores?");
    if (venderOComprar.toLowerCase() === "comprar") {
        let Eleccion = Comprar(); 
        cuponDescuento(Eleccion); 
    } else if (venderOComprar.toLowerCase() === "vender") {
        let procesadoresPreCargados = Productos(); 
        let productosCargadosPorElUsuario = venderProcesador(); 
        concatDeProcesadores(procesadoresPreCargados, productosCargadosPorElUsuario); 
    } else alert("Opcion invalida");
};

const Comprar = () => {
    let comprar = prompt("Elija marca y modelo del procesador"); 
    let productosCargados = Productos();
    let procesadorAComprar = [];
    const filtro = productosCargados.filter(item => { 
        return item.marca.toLowerCase() === comprar.toLowerCase();
    });

    if (filtro.length === 0) { 
        alert(`No tenemos stock de esa marca ${comprar}`);
        const marcas = [...new Set(productosCargados.map(procesador => procesador.marca))];
        let marcasCadena = marcas.join(", "); 
        let mensaje = `Tenemos procesadores de estas marcas ${marcasCadena}`;
        alert(mensaje);
        Comprar();
    };

    filtro.forEach((item, index) => { 
        let mensaje = `
        Procesador: ${index + 1}
        Marca: ${item.marca}
        Modelo: ${item.modelo}
        Precio: $${item.precio}`;
        procesadorAComprar.push(item);
        alert(mensaje);
    });

    let opcion = parseInt(prompt("Ingrese el número del procesador deseado")); 
    const procesadorElegido = filtro[opcion - 1];
    if (opcion >= 1 && opcion <= filtro.length) {
        alert(`Usted eligio ${procesadorElegido.marca}, ${procesadorElegido.modelo} `);
    } else alert("Opción inválida.");
    alert("Gracias por comprar tu Procesador con nosotros. A continuación ingrese su email para ponernos en contacto con usted.")
    prompt("Ingrese su email");
    alert("Gracias por mandar su email, nos mantendremos en contacto a la brevedad.")
    return procesadorAComprar;
};

const venderProcesador = () => {
    let vender = confirm("Quieres vender tu procesador?");
    const cargarProcesador = [];
    while (vender === true) {
        cargarProcesador.push(new Procesadores(prompt("Ingrese la marca"),
            prompt("Ingrese el modelo del procesador"),
            parseInt(prompt("Ingrese el precio al que desea venderlo"))));
        vender = confirm("Quieres vender otro Procesador?");
    };
    return cargarProcesador;
};

const concatDeProcesadores = (procesadoresPreCargados, productosCargadosPorElUsuario) => {
    let concatDeProcesadores = procesadoresPreCargados.concat(productosCargadosPorElUsuario);
    
    if (productosCargadosPorElUsuario.length > 1) {
        alert(`Gracias por vender ${productosCargadosPorElUsuario.length} procesadores con nosotros. Ingrese a continuación su email para finalizar su venta.`);
    } else if (productosCargadosPorElUsuario.length === 1) {
        alert("Gracias por vender tu procesador con nosotros. Ingrese a continuación su email para finalizar su venta.");
        prompt("Ingrese su email");
        alert("Gracias por mandar su email, nos mantendremos en contacto a la brevedad.")
    } else alert("Nos encantaria que vendas tu Procesador con nosotros.");
    return concatDeProcesadores;
}

compraOVenta();