let ref = 0
export const productos = [
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 6,
    categoria: "tortas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 0,
    categoria: "postres",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 10,
    categoria: "postres",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 0,
    categoria: "postres",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 9,
    categoria: "cupcakes",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 0,
    categoria: "cupcakes",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 10,
    categoria: "galletas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    referencia : ref + 1,
    precio: "20000",
    descuento: 0,
    categoria: "galletas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
];

export const getCategoriasUnicas = () => {
  return [...new Set(productos.map((producto) => producto.categoria))];
};


export const getProductosConOfertas = () => {
  return productos.filter((producto) => producto.descuento > 0);
};
