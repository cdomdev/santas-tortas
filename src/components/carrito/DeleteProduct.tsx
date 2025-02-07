import type { UUID, Producto } from "@/types/index";
import { eventEmitter } from "@/events";
import { handleToast } from "@/utils";

type DeleteProductProps = {
  productoId: UUID;
  productos: Producto[];
  setProductos: (productos: Producto[]) => void;
  setToastMessage: (message: string) => void;
  setShowToast: (show: boolean) => void;
  setBgToast: (bg: string) => void;
};

export const DeleteProduct = ({
  productoId,
  productos,
  setProductos,
  setToastMessage,
  setShowToast,
  setBgToast,
}: DeleteProductProps) => {
  const deleteProduct = () => {
    const updateItemsCar = productos.filter((item) => item.id !== productoId);
    localStorage.setItem("carrito", JSON.stringify(updateItemsCar));
    setProductos(updateItemsCar);

    handleToast({
      background: "toast-success",
      message: `Se elimino un producto de tu carrito`,
      setShowToast,
      setBgToast,
      setToastMessage,
    });
    if (eventEmitter) {
      eventEmitter.emit("carritoChanged");
    }
  };

  return (
    <>
      <button
        className="pr-3 py-4 text-red-600  hover:scale-125 transform transition duration-300 ease-in-out"
        onClick={deleteProduct}
      >
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
          <path d="M4 7l16 0"></path>
          <path d="M10 11l0 6"></path>
          <path d="M14 11l0 6"></path>
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
        </svg>
        <span className="sr-only">button delete</span>
      </button>
    </>
  );
};
