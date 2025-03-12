import type { Producto, Usuario } from "@/types";
import { useState, useEffect } from "react";
import {
  calcularTotal,
  formateValue,
  calcularSubTotal
} from "@/utils";

export const Detalles = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [envio, setEnvio] = useState<string | null>(null);
  
  let valorEnvio = 15000;

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setProductos(carrito);

    const datosEnvio = localStorage.getItem("value-car-forsend");
    if (datosEnvio) {
      setEnvio(datosEnvio);
    }
  }, []);

  const totalConEnvio = calcularTotal(productos) + valorEnvio;
  const SubtotalInt = formateValue(totalConEnvio.toString());

  return (
    <>
      <h2 className="text-center md:text-lg font-semibold text-gray-600 uppercase py-2">
        Este es un resumen de tu compra
      </h2>
      <div className="border px-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 md:px-4 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-2 md:px-4 py-3">
                  Descuento
                </th>
                <th scope="col" className="px-2 md:px-4 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-2 md:px-4 py-3">
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
                  <td className="px-4 md:px-6 py-4">{producto.title}</td>
                  <td className="px-4 md:px-6 py-4 text-red-600">
                    {producto.discount}%
                  </td>
                  <td className="px-4 md:px-6 py-4">{producto.quantity}</td>
                  <td className="px-4 md:px-6 py-4">{calcularSubTotal(producto)}</td>
                </tr>
              ))}

              {envio ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4 text-black font-semibold">Envio</td>
                  <td className="px-4 md:px-6 py-4"></td>
                  <td className="px-4 md:px-6 py-4"></td>
                  <td className="px-4 md:px-6 py-4">
                    {formateValue(valorEnvio.toString())}
                  </td>
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
                <td className="px-4 py-4 text-black font-semibold">
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
    const datos = JSON.parse(sessionStorage.getItem("data") || "[]");
    setDatos(datos);
  }, []);

  return (
    <>
      <div className="border px-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b">
                <th scope="col" className="px-4 py-3">
                  Nombres
                </th>
                <th scope="col" className="px-4 py-3 border-r border-l ">
                  Apellidos
                </th>
                <th scope="col" className="px-4 py-3 border-r border-l ">
                  Telefono
                </th>
                <th scope="col" className="px-4 py-3">
                  Direccion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-2 py-4">{datos?.nombre}</td>
                <td className="px-2 py-4">{datos?.apellidos}</td>
                <td className="px-2 py-4">{datos?.telefono}</td>
                <td className="px-2 py-4">{datos?.direccion}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex w-full flex-col">
            <p className="text-center font-semibold text-gray-600 pt-1 border-b">
              Datos adicionales
            </p>
            <p className=" text-gray-600 text-sm py-3 text-balance px-6">{datos?.message}</p>
          </div>
        </div>
      </div>
    </>
  );
};
