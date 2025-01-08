import type { Producto } from "@/types";
import { useEffect, useState } from "react";

const TablerListToCar = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setProductos(carrito);
  }, []);

  return (
    <div className="min-w-11/12 w-[95%] mx-auto md:min-w-[65%] h-80 overflow-y-auto">
      {!productos || productos.length === 0 ? (
        <span className="flex items-center justify-center flex-col ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            className="size-24 text-gray-400"
            strokeWidth="1"
          >
            <path d="M11.5 21h-2.926a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.117 .761"></path>
            <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M20.2 20.2l1.8 1.8"></path>
          </svg>
          <p className="text-sm md:text-base text-black">Tu Carrito vacio...</p>

          <a
            href="/productos/productos"
            type="button"
            className="uppercase text-xs text-center md:text-sm bg-secondary-bg hover:bg-[#d66a6e] w-1/3 duration-150 text-black py-2 px-3 rounded-md mx-auto mt-6 font-semibold hover:text-gray-100"
          >
            Hacer mis compras
          </a>
        </span>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-t-lg">
          <thead className="text-xs static text-gray-700 uppercase bg-[#e9e7e5] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 rounded-tl-md">
                {" "}
                Producto{" "}
              </th>
              <th scope="col" className="px-2 py-3">
                {" "}
                Referencia{" "}
              </th>
              <th scope="col" className="px-2 py-3">
                {" "}
                Cantidad{" "}
              </th>
              <th scope="col" className="px-2 py-3">
                {" "}
                Precio{" "}
              </th>
              <th scope="col" className="px-2 py-3 rounded-tr-md">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="max-h-10 h-10 overflow-y-auto">
            {productos.map((producto) => (
              <tr
                key={producto.id}
                className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 "
              >
                <td className="flex flex-col items-start justify-center gap-y-1 p-2">
                  <img
                    src={producto.imagen}
                    className="size-16 md:size-24 rounded-sm"
                    alt={producto.nombre}
                  />

                  <span className="font-semibold md:pl-2 text-center text-black text-balance">
                    {producto.nombre}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {producto.referencia}
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {producto.quantity}
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  ${producto.precio}
                </td>
                <td className="pr-3 py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    className="stroke-red-600 text-red-600 size-6 md:size-7 cursor-pointer "
                    height="24"
                    strokeWidth="2"
                  >
                    <path d="M4 7h16"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    <path d="M10 12l4 4m0 -4l-4 4"></path>
                  </svg>
                  <span className="sr-only">delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablerListToCar;