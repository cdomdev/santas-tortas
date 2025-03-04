import type { Producto } from "@/types";
import { useState } from "react";
import { eventEmitter } from "@/events";
import { Toast } from "../Toast";
import { handleToast } from "@/utils";

export const BtnAddCar: React.FC<{ producto: Producto }> = ({ producto }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addProductoLocal = (producto: Producto, quantity: number): void => {
    let productosLocal: Producto[] = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    );

    const productoExistente = productosLocal.find(
      (prod) => prod.id === producto.id
    );

    if (productoExistente) {
      productoExistente.quantity = (productoExistente.quantity || 0) + quantity;
    } else {
      productosLocal.push({ ...producto, quantity });
    }

    localStorage.setItem("carrito", JSON.stringify(productosLocal));

    if (eventEmitter) {
      eventEmitter.emit("carritoChanged");
    }
  };

  const handleAddToCart = () => {
    addProductoLocal(producto, quantity);
    handleToast({
      background: "toast-success",
      message: `${quantity > 1 ? "Se agregaron nuevos productos" : "Se agrego un nuevo producto"} a tu carrito`,
      setShowToast,
      setBgToast,
      setToastMessage,
    });
  };

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

      <div className="border flex justify-center items-center px-2  ">
        <button className="decrement" onClick={handleDecrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="2"
          >
            <path d="M9 12h6"></path>
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
          </svg>
          <span className="sr-only">decrement</span>
        </button>
        <input
          type="number"
          className="border-none focus:border-transparent focus:outline-none appearance-none
             [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [&::-moz-appearance]:textfield m-0 text-center w-[40px] font-bold text-lg ring-0 focus:ring-0 px-2"
          min="1"
          max="100"
          step="2"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button className="increment" onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
            className="stroke-black fill-white"
          >
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
            <path d="M15 12h-6"></path>
            <path d="M12 9v6"></path>
          </svg>
          <span className="sr-only">increment</span>
        </button>
      </div>
      <button
        onClick={() => handleAddToCart()}
        className="uppercase text-base md:text-lg bg-secondary-bg hover:bg-[#d66a6e] duration-150 text-black font-semibold py-2 px-3 rounded-md w-full"
      >
        Agregar al carrito
      </button>
    </>
  );
};
