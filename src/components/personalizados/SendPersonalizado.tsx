import { useEffect, useState } from "react";
import type { Usuario, Personalizado } from "@/types";
import { Toast } from "../Toast";
import { handleToast } from "@/utils/handleToast";

const SendPersonalizado = () => {
  const [datos, setDatos] = useState<Usuario>();
  const [orden, setOrden] = useState<Personalizado>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDatos(getDataOrder("data"));
    setOrden(getDataOrder("data-product-custom"));
  }, []);

  const dataOrder = { ...datos, ...orden };

  const getDataOrder = (clave: string) => {
    const datos = sessionStorage.getItem(clave);
    if (datos) {
      return JSON.parse(datos);
    }
  };

  function senOrder() {
    setLoading(true);
    handleToast({
      background: 'toast-success',
      message: 'Tu pedido personalizado fue enviado con éxito',
      setShowToast,
      setBgToast,
      setToastMessage
    });
    
    setLoading(false);
    setTimeout(() => {
      window.location.href = '/personalizados/success'    
    }, 2000);

  }

  return (
    <div className="py-3 w-full my-3">
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        bgToast={bgToast}
        setBgToast={setBgToast}
      />

      <button
        onClick={senOrder}
        type="button"
        className="text-black hover:text-white transition duration-200 bg-secondary-bg hover:bg-[#d66a6e] uppercase focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        {loading ? "Enviando pedido..." : "Enviar pedido"}
      </button>
    </div>
  );
};

export default SendPersonalizado;
