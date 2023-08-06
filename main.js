alert("Bienvenido a Romero's pizzeria")

let pizzeria = prompt("ingrese el gusto de pizza que desee");

let precioPizza = "";

const pizzas = () => {
    while (precioPizza <= 0 ){
        switch (pizzeria.toLowerCase()) {
            case "muzzarella":
                precioPizza = 4100;
            break;
            case "fugazzeta":
                precioPizza = 5000;
            break;
            case "napolitana":
                precioPizza = 4500;
            break;
            default: alert(`${pizzeria} No tenemos esa pizza (Pruebe con muzzarella, fugazzeta o napolitana)`);
            break;
        };
        if (precioPizza > 0 ){
            alert(`Su pizza vale $${precioPizza}`);
        }else pizzeria = prompt("ingrese el gusto de pizza que desee");
        }
}
pizzas();

alert("tenes un descuento de 20% por tu primera compra!");

const descuentoFinal = (a, b, c) => a - b * c;

let descuento = 0.20;

let precioFinal = descuentoFinal(precioPizza, descuento, precioPizza);

alert(`te quedaria un total de $${parseInt(precioFinal)}`)
