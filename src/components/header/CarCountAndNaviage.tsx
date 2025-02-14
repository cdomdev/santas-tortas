import { useEffect, useState } from "react";
import { eventEmitter } from "@/events";
import type { Producto } from "@/types";
import { priceFormated, calcularTotal, formateValue } from "@/utils";
import { DeleteProduct } from "../carrito/DeleteProduct";
const CarCountAndNavigate = () => {
  const [cantidad, setCantidad] = useState<number>(0);
  const [carrito, setCarrito] = useState<Producto[]>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  useEffect(() => {
    const handleCarritoChange = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCantidad(carrito.length);
      setCarrito(carrito);
    };
    if (eventEmitter) {
      eventEmitter.on("carritoChanged", handleCarritoChange);
    }
    handleCarritoChange();
    return () => {
      if (eventEmitter) {
        eventEmitter.off("carritoChanged", handleCarritoChange);
      }
    };
  }, []);

  const subTotalText = calcularTotal(carrito).toString();
  const SubtotalInt = formateValue(subTotalText);

  return (
    <article
      className="relative p-0 m-0 flex flex-col items-center cursor-pointer gap-y-1 group transition duration-500"
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          className="size-7 md:size-8"
          height="24"
          strokeWidth="1"
          onClick={() => (window.location.href = "/carrito-compras")}
        >
          <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
          <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
        </svg>
        {cantidad > 0 ? (
          <span className=" size-4 bg-red-600 text-xs md:text-sm rounded-full text-white absolute flex justify-center items-center right-1 top-[-0.5em]">
            {cantidad}
          </span>
        ) : (
          ""
        )}

        <div
          className="absolute flex-col items-center bg-white min-w-80 max-w-80 p-3 top-10  -left-44 w-fit border rounded-md shadow-lg h-auto z-50
         opacity-0 translate-y-4 transition-all duration-500 ease-in-out 
            group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto"
        >
          {carrito && carrito.length === 0 ? (
            <p className="text-base text-center text-gray-500">
              El carrito está vacío...
            </p>
          ) : (
            <div className="flex flex-col gap-y-2 overflow-hidden overflow-y-auto  max-h-96">
              {carrito?.map((producto) => (
                <div
                  key={producto.id}
                  className="flex gap-2  items-center justify-between border-b pb-2"
                >
                  <img
                    src={producto.imagen}
                    alt={`imagen de producto ${producto.nombre}`}
                    className="w-16"
                  />
                  <div className="flex flex-col">
                    <p>{producto.nombre}</p>
                    <p className="text-gray-600">
                      Cantidad : <strong>{producto.quantity}</strong>
                    </p>
                    <p className="text-gray-600">
                      Precio: {priceFormated(producto.precio)}
                    </p>
                  </div>
                  <DeleteProduct
                    productoId={producto.id}
                    productos={carrito}
                    setProductos={setCarrito}
                    setToastMessage={setToastMessage}
                    setShowToast={setShowToast}
                    setBgToast={setBgToast}
                  />
                </div>
              ))}
            </div>
          )}
          <div
            className={` ${cantidad === 0 ? "hidden" : "block"} border-t pb-2`}
          >
            <div className="border-b border-t py-5 px-2 flex flex-col gap-y-3">
              <div className="flex justify-between">
                <p> Cantidad de productos: </p>
                <p>{cantidad}</p>
              </div>
              <div className="flex justify-between">
                <p>Total:</p>
                <p>{SubtotalInt}</p>
              </div>
            </div>
            <a
              href="/carrito-compras"
              className="bg-[#ebd4b9] border w-full block p-3 text-center uppercase hover:bg-[#cab195] hover:text-white transition duration-500"
            >
              Ver carrito
            </a>
          </div>
        </div>
      </div>

      <span className="sr-only">Carrito</span>
      <span className="hidden md:block text-xs -mt-1 text-black">Carrito</span>
    </article>
  );
};

export default CarCountAndNavigate;
