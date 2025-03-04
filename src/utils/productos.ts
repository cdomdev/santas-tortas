import type { Producto } from "@/types/types";

// funcion para formatar el valor de los productos - pase de esto 1000000 a esto 1.000.000
export function formateValue(value: string) {
  const valueParse = parseFloat(value);
  return valueParse.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// funcion para validar el argumento de entrada y retornar valor aunque sea undefined
export const priceFormated = (value: number | string | undefined) => {
  if (typeof value === "string") {
    return formateValue(value);
  } else {
    let valueText = value?.toString();
    valueText ? formateValue(valueText) : 0
  }
};



// function para calcular el subtotal de los productos de manera indivudual

export const calcularSubTotal = (producto: Producto) => {
  const cantidad = producto.quantity ?? 0;
  const valor = parseFloat(producto.price) ?? 0;
  const descuento = producto.discount ?? 0;

  let valorTotal;
  if (descuento && descuento > 0) {
    let valorDeDescuento = (valor * descuento) / 100;
    valorTotal = (valor - valorDeDescuento) * cantidad;
  } else {
    valorTotal = cantidad * valor;
  }

  const valueParsed = valorTotal.toFixed(2);
  return formateValue(valueParsed);
};


// funcion para calcular el total de los productos

export const calcularTotal = (items: Producto[] | null | undefined): number => {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  return items.reduce((total, item) => {
    const cantidad = item.quantity || 0;
    const valor = parseFloat(item.price);

    let valorFinal;

    if (item.discount && item.discount > 0) {
      // Verifica si hay descuento y calcula el valor con descuento
      valorFinal = parseFloat(
        calcularDescuentoParaTotal(item.price, item.discount)
      );
    } else {
      valorFinal = valor;
    }

    // Sumar el valor final multiplicado por la cantidad
    return total + valorFinal * cantidad;
  }, 0);
};


// funcion para calcular el total de los productos con descuento - esta es auxiliar la duncion de total, ya que calcula el descuento por cada producto

export function calcularDescuento(
  value: string,
  discount: number | null
): string {
  // Convierte el valor de string a número
  const valueNumber = parseFloat(value);

  // Si el descuento es null o 0, retorna el valor original formateado
  if (!discount) {
    const valueString = valueNumber.toString();
    // Retorna el valor formateado
    return formateValue(valueString);
  }

  // Calcula el descuento
  const discountOfert = (valueNumber * discount) / 100;
  const valueFinish = valueNumber - discountOfert;

  // Formatea el valor final y retorna como string
  const valueFinishString = valueFinish.toString();
  return formateValue(valueFinishString);
}


export const calcularDescuentoParaTotal = (
  valor: string,
  discount: number
): string => {
  const valorNumerico = parseFloat(valor);
  const descuentoAplicado = valorNumerico - valorNumerico * (discount / 100);
  return descuentoAplicado.toFixed(2);
};
