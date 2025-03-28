import { useEffect, useState } from "react";
import type { PersonalizedOrder } from "@/types";
import { Toast } from "../Toast";
import { handleToast } from "@/utils/handleToast";
import { personalized } from "@/lib/personalizedOrder";

const SendPersonalizado = () => {
  const [datos, setDatos] = useState<PersonalizedOrder>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("data") || "[]");
    setDatos(data);
  }, []);

  async function senOrder() {
    try {
      if (!datos) {
        return null;
      }
      const response = await personalized(datos);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    // handleToast({
    //   background: "toast-success",
    //   message: "Algooo",
    //   setShowToast,
    //   setBgToast,
    //   setToastMessage,
    // });

    // setLoading(false);
    // setTimeout(() => {
    //   window.location.href = "/personalizados/envio-exitoso";
    // }, 2000);
  }

  return (
    <div className="py-3 w-full my-10">
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
