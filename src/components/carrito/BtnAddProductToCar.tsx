import type { Producto } from "@/types";
import { useState } from "react";
import { eventEmitter } from "@/events";
import { Toast } from "../Toast";


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

  const handleToast = (bg: string, ms: string) => {
    setShowToast(true);
    setBgToast(bg);
    setToastMessage(ms);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleAddToCart = () => {
    addProductoLocal(producto, quantity);
    handleToast("toast-success", `${quantity > 1 ? "Se agregaron nuevos productos" : "Se agrego un nuevo producto"} a tu carrito`);
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
            className="icon icon-tabler icon-tabler-shopping-cart-minus size-6 font-semibold hover:scale-125 duration-200"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12.5 17h-6.5v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
            <path d="M16 19h6" />
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
            className="icon icon-tabler icon-tabler-shopping-cart-plus size-6 font-semibold hover:scale-125 duration-200"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12.5 17h-6.5v-14h-2" />
            <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
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
