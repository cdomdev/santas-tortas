import { useEffect, useState } from "react";
import { eventEmitter } from "@/events";

const CarCountAndNavigate = () => {
  const [cantidad, setCantidad] = useState<number>(0);

  useEffect(() => {
    const handleCarritoChange = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCantidad(carrito.length);
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

  return (
    <a
      className="relative p-0 m-0 flex flex-col items-center cursor-pointer gap-y-1"
      href="/carrito-compras"
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
      </div>
      <span className="sr-only">Carrito</span>
      <span className="hidden md:block text-xs -mt-1 text-black">Carrito</span>
    </a>
  );
};

export default CarCountAndNavigate;
