import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { Usuario } from "@/types";
import { Toast } from "./Toast";

const FormSaveData = () => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  const handleToast = (bg: string, ms: string) => {
    setShowToast(true);
    setBgToast(bg);
    setToastMessage(ms);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleSubmit = (values: Usuario) => {
    console.log(values);
    window.localStorage.setItem('data', JSON.stringify(values));
    window.localStorage.setItem('currentStep', '3')
    window.localStorage.setItem('value-car-forsend', 'OK')
    window.location.href = "/pago";
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          nombre: "",
          apellidos: "",
          telefono: "",
          direccion: "",
          message: "",
        }}
        validate={(values: Usuario) => {
          const errors: Partial<Usuario> = {};
          if (!values.nombre) {
            errors.nombre = "¡Este campo no puede quedar vacio!";
          }
          if (!values.email) {
            errors.email = "¡Este campo no puede quedar vacio!";
          }
          if (!values.apellidos) {
            errors.apellidos = "¡Este campo no puede quedar vacio!";
          }
          if (!values.telefono) {
            errors.telefono = "¡Este campo no puede quedar vacio!";
          }
          if (!values.direccion) {
            errors.direccion = "¡Este campo no puede quedar vacio!";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <>
            <Toast
              showToast={showToast}
              setShowToast={setShowToast}
              toastMessage={toastMessage}
              setToastMessage={setToastMessage}
              bgToast={bgToast}
              setBgToast={setBgToast}
            />
            <Form className="max-w-4xl mx-auto" onSubmit={formik.handleSubmit}>
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
                  form="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Correo electronico
                </label>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600 text-xs"
                />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
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
                    Nombres
                  </label>
                  <ErrorMessage
                    name="nombre"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="apellidos"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    form="apellidos"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Apellidos
                  </label>
                  <ErrorMessage
                    name="apellidos"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="tel"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    name="telefono"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    form="telefono"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Numero de telefono (123-456-7890)
                  </label>
                  <ErrorMessage
                    name="telefono"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="direccion"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    form="direccion"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Direccion
                  </label>
                  <ErrorMessage
                    name="direccion"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  form="message"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Detalles adicionales
                </label>
                <Field
                  as="textarea"
                  name="message"
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#eb9f48] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48]"
                  placeholder="Ej: conjunto residencial altos, torre 9 apartamento 100"
                />
              </div>

              <button
                type="submit"
                className={
                  "text-black hover:text-white transition duration-200 bg-secondary-bg hover:bg-[#d66a6e] uppercase focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                }
              >
                Continuar
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormSaveData;
