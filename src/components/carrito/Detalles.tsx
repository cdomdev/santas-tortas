import  type{ Producto, Usuario} from "@/types";
import { useState, useEffect } from "react";
import {
  calcularTotal,
  formateValue,
  calcularSubTotal,
} from "@/utils/productos";


export const Detalles = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setProductos(carrito);
  }, []);

  const envio = localStorage.getItem("send-value-car") || 0;
  const subTotalText = calcularTotal(productos).toString();
  const SubtotalInt = formateValue(subTotalText);

  return (
    <>
      <h3 className="text-center md:text-lg font-semibold text-gray-600 uppercase py-2">
        Este es un resumen de tu compra
      </h3>
      <div className="border">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-4 py-3">
                  Descuento
                </th>
                <th scope="col" className="px-4 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-4 py-3">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4">{producto.nombre}</td>
                  <td className="px-6 py-4 text-red-600">
                    {producto.descuento}%
                  </td>
                  <td className="px-6 py-4">{producto.quantity}</td>
                  <td className="px-6 py-4">{calcularSubTotal(producto)}</td>
                </tr>
              ))}

              {envio ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4 text-black font-semibold">Envio</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">{formateValue(envio)}</td>
                </tr>
              ) : null}
            </tbody>

            <tfoot>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total
                </th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-black font-semibold">
                  $ {SubtotalInt}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export const DetallesUsuario = () => {
  const [datos, setDatos] = useState<Usuario>();
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("data-send-user") || "[]");
    setDatos(carrito);
  }, []);

  return (
    <>
      <div className="border">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-4 py-3">
                  Descuento
                </th>
                <th scope="col" className="px-4 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-4 py-3">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {datos
                ? datos.map((dato) => (
                    <tr
                      key={dato.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4">{dato.nombre}</td>
                      <td className="px-6 py-4 text-red-600">{dato}%</td>
                      <td className="px-6 py-4">{}</td>
                    </tr>
                  ))
                : null}
            </tbody>

            <tfoot>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total
                </th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
