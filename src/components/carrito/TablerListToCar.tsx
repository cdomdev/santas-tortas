import type { Producto } from "@/types";
import { useEffect, useState } from "react";
import { DeleteProduct } from "./DeleteProduct";
import { Toast } from "../Toast";
import { calcularSubTotal, calcularTotal, formateValue } from "@/utils";
import { handleToast } from "@/utils";

const TablerListToCar = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setProductos(carrito);
  }, []);

  const handleNetxPage = () => {
    if (!productos || productos.length === 0) {
      handleToast({
        background: "toast-error",
        message: "No hay productos en el carrito",
        setShowToast,
        setBgToast,
        setToastMessage,
      });
      return;
    }
    localStorage.setItem("currentStep", `2`);
    window.location.href = "/datos-envio";
  };

  const subTotalText = calcularTotal(productos).toString();
  const SubtotalInt = formateValue(subTotalText);

  return (
    <>
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        bgToast={bgToast}
        setBgToast={setBgToast}
      />
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
            <p className="text-sm md:text-base text-black">
              Tu Carrito vacio...
            </p>

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
                  Descuento{" "}
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
                  <td className="px-4 py-4 font-semibold text-red-600 ">
                    {producto.descuento} %
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    {producto.quantity}
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    ${calcularSubTotal(producto)}
                  </td>

                  <td className="pr-3 py-4">
                    <DeleteProduct
                      productoId={producto.id}
                      productos={productos}
                      setProductos={setProductos}
                      setToastMessage={setToastMessage}
                      setShowToast={setShowToast}
                      setBgToast={setBgToast}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="h-200 border-4 w-[95%] md:w-[35%] max-h-80 px-4 py-5 mx-auto">
        <h3 className="text-center md:text-lg font-semibold text-gray-600 uppercase py-2">
          Detalles de tu compra
        </h3>
        <span className="flex justify-between py-3">
          <h4 className="font-semibold text-black text-base">Subtotal</h4>
          <p>$: {SubtotalInt}</p>
        </span>
        <hr />
        <span className="text-sm font-semibold text-gray-400 py-4 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle stroke-red-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 9v4"></path>
            <path d="M12 16v.01"></path>
          </svg>
          <p className="text-black opacity-75">
            El costo de envio aun no esta incluido
          </p>
        </span>
        <hr />
        <span className="flex justify-between py-3 mb-3">
          <h4 className="font-semibold text-black text-base">Total</h4>
          <p>$: {SubtotalInt}</p>
        </span>
        <button
          className="uppercase block text-center text-base md:text-lg bg-secondary-bg hover:bg-[#d66a6e] duration-150 text-black font-semibold hover:text-gray-100 py-2 px-3 rounded-md w-full"
          onClick={handleNetxPage}
        >
          Finalizar compra
        </button>
      </div>
    </>
  );
};

export default TablerListToCar;
