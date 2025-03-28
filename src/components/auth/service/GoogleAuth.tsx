import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { googleAuth } from "@/lib/auth";
import Cookies from "js-cookie";
import { eventEmitter } from "@/events";
import { handleToast } from "@/utils";
import { Toast } from "@/components/Toast";

export const GoogleProvider = () => {
  const CLIEN_ID = import.meta.env.PUBLIC_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={CLIEN_ID}>
      <GoogleAuth />
    </GoogleOAuthProvider>
  );
};

const GoogleAuth = () => {
  const [path, setPath] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = window.sessionStorage.getItem("path");
    if (path) {
      setPath(path);
    } else {
      setPath("/");
    }
  }, []);

  const googleInit = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response) return;
      setLoading(true);
      try {
        const data = await googleAuth(response);
        if (data) {
          const { user, jwt } = data.data;
          Cookies.set("access_token", jwt, {
            expires: 1,
            sameSite: "lax",
            secure: true,
          });
          handleToast({
            background: "toast-success",
            message: "Inicio de sesion exitoso",
            setShowToast,
            setBgToast,
            setToastMessage,
          });
          if (eventEmitter) {
            eventEmitter.emit("changeSesion");
            setTimeout(() => {
              window.location.href = `${path}`;
            }, 2000);
          }
        } else {
          handleToast({
            background: "toast-fail",
            message:
              "Algo salio mal con el inicio de sesion, intentalo mas tarde",
            setShowToast,
            setBgToast,
            setToastMessage,
          });
        }
      } catch (error) {
        setLoading(false);

        console.error("Error en el inicio de seion con proveedore externo");
      } finally {
        setLoading(false);
      }
    },
    onError: async (response) => {
      console.log("algo salio mal con el inicio de sesion--_>", response);
    },
  });

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
      <button
        onClick={() => googleInit()}
        className="mx-auto bg-white -mb-3  text-black shadow-sm hover:bg-blue-500 rounded-lg flex items-center transition duration-150 justify-center w-9/12 gap-x-1 py-1.5 hover:text-white text-xs md:text-base font-medium"
      >
        <svg
          className="icon size-7"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        <span className="text-sm md:text-base">
          {" "}
          {loading ? "Validando..." : "Iniciar sesion con google"}
        </span>
      </button>
      <span className="text-xs md:text-sm text-gray-600 text-balance block mx-auto max-w-[80%] md:w-full">
        Inicia sesion con tu cuenta de google
      </span>
    </>
  );
};
