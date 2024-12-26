export const productos = [
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
    precio: "20000",
    descuento: 0,
    categoria: "tortas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
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
    precio: "20000",
    descuento: 0,
    categoria: "galletas",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aliquam blanditiis voluptate perferendis consequuntur soluta eaque molestias vitae quod omnis beatae fuga sed optio, quam ducimus tempora magnam, quo aut.",
  },
  {
    id: crypto.randomUUID(),
    nombre: "producto",
    imagen: "/torta.png",
    url: "/",
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
