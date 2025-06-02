import { useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Toast } from "../Toast";
import axios from "axios";
import { checkoutMercadopago } from "@/lib";
import type { Producto, Usuario } from "@/types";

const { PUBLIC_CLIENT_MERCADOPAGO } = import.meta.env;

interface PropsPayment {
  products: Producto[];
  envio: number;
  usuario?: Usuario;
}

export const MercadoPago = ({ products, usuario, envio }: PropsPayment) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  initMercadoPago(PUBLIC_CLIENT_MERCADOPAGO, {
    locale: "es-CO",
  });


  const createOrder = async () => {
    try {
      setIsLoading(true);
      const response = await checkoutMercadopago({products, envio, usuario});
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        if (status === 400) {
        }
      }
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex flex-col items-center justify-center mb-3 ">
        <button
          className="border flex py-2 px-4 items-center gap-1 rounded-md bg-[#009ee3] text-white hover:bg-[#0049e5ef] duration-100"
          onClick={createOrder}
        >
          {isLoading ? (
            <>
              <img
                src="public/mercadopago.webp"
                alt="logo de mercadopago"
                className="size-7"
              />

              Creando orden de pago...
            </>
          ) : (
            <>
              <img
                src="public/mercadopago.webp"
                alt="logo de mercadopago"
                className="size-7"
              />
              Pagar con Mercado Pago
            </>
          )}
        </button>
        <span className="text-gray-500 text-xs mt-1">Paga de forma segura</span>
      </div>
    </>
  );
};
