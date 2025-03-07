import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleToast } from "@/utils";
import { Toast } from "../Toast";
import { useState } from "react";
import Cookies from "js-cookie";
import { initSesion } from "@/lib/auth";

type PropLogin = {
  email: string;
  password: string;
  passwordRepeat: string;
};

const Login = () => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: PropLogin) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await initSesion(values);
      if (response) {
        console.log(response);
        setLoading(false);
        handleToast({
          background: "toast-success",
          message: "Inicio de sesion exitoso",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
      }
      const { jwt, user } = response;
      Cookies.set("access_token", jwt, {
        expires: 1,
        sameSite: "lax",
        secure: true,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordRepeat: "",
        }}
        validate={(values: PropLogin) => {
          const errors: Partial<PropLogin> = {};

          if (!values.email) {
            errors.email = "¡El campo para el correo no puede quedar vacío!";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "¡Debe ingresar un correo válido!";
          }

          if (!values.password) {
            errors.password = "¡Este campo no puede quedar vacío!";
          }

          if (!values.passwordRepeat) {
            errors.passwordRepeat = "¡Se requiere confirmar la contraseña!";
          } else if (values.password !== values.passwordRepeat) {
            errors.passwordRepeat = "¡Las contraseñas deben coincidir!";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="mx-auto" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#eb9f48]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Direccion de correco electronico
              </label>

              <ErrorMessage
                name="email"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña
              </label>

              <ErrorMessage
                name="password"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="password"
                name="passwordRepeat"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="passwordRepeat"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirma tu contraseña
              </label>

              <ErrorMessage
                name="passwordRepeat"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <button
              type="submit"
              className="text-black bg-secondary-bg hover:bg-[#d66a6e] uppercase  hover:text-white transition duration-200 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              {loading ? "Iniciando sesion..." : "Iniciar sesion"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
