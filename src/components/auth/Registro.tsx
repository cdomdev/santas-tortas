import type { Usuario } from "@/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Toast } from "../Toast";
import { handleToast } from "@/utils";
import { useState } from "react";
import { register } from "@/lib/auth";
import axios from "axios";

interface PropRegister extends Usuario {
  password: string;
  passwordRepeat: string;
}

const Registro = () => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: PropRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    setLoading(true);

    try {
      const response = await register(values);
      if (response) {
        setLoading(false);
        resetForm();
        setTimeout(() =>{
          window.location.href = '/acount/login'
        }, 2000)
        handleToast({
          background: "toast-success",
          message:
            "Registro exitoso, ya puedes iniciar sesion en santas tortas",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        if (status === 400) {
          handleToast({
            background: "toast-fail",
            message: "Ya existe un usuario con los datos ingresados",
            setShowToast,
            setBgToast,
            setToastMessage,
          });
        } else {
          handleToast({
            background: "toast-fail",
            message: "Hubo un error en el registro, intentelo de nuevo",
            setShowToast,
            setBgToast,
            setToastMessage,
          });
        }
      }
      console.log(error);
    }finally{
      setLoading(false)
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
          nombre: "",
          email: "",
          password: "",
          passwordRepeat: "",
        }}
        validate={(values: PropRegister) => {
          const errors: Partial<PropRegister> = {};
          if (!values.nombre)
            errors.nombre = "¡El campo de nombre no puede quedar vacio!";
          if (!values.email)
            errors.email = "¡El campo para el correo no puede quedar vacio!";
          if (!values.password) {
            errors.password = "¡Se requiere una contraseña!";
          } else if (
            !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,12}$/.test(values.password)
          ) {
            errors.password = `¡RECOMENDACION!: La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener un minimo de 5 y un máximo de 12 caracteres`;
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
                type="text"
                name="nombre"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                form="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombres y apllidos
              </label>
              <ErrorMessage
                name="nombre"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

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
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                htmlFor="floating_password"
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
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="text-black mt-5 bg-secondary-bg hover:bg-[#d66a6e] hover:text-white uppercase focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
            >
              {loading ? "Creando cuanta..." : "Crear cuenta"}
            </button>


            <span className="text-center block text-xs md:text-sm">Si ya tienes una cuenta puedes <a href="/acount/login" className="underline text-blue-500 uppercase">Iniciar sesion</a></span>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default Registro;
