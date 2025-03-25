import { Field, Formik, ErrorMessage, Form } from "formik";
import { susbcribre } from "@/lib";
import { Toast } from "../Toast";
import { handleToast } from "@/utils";


import { useState } from "react";

interface PropSub {
  email: string;
}

export const FormSub = () => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: PropSub,
    { resetForm }: { resetForm: () => void }
  ) => {
    setLoading(true);
    try {
      const response = await susbcribre(values);
      if (response?.status === 200) {
        resetForm();
        setLoading(false);
        handleToast({
          background: "toast-success",
          message: "Gracias por subscribirte al boletín de noticias, te mantendremos informado de todas las novedades",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
      }else{
        handleToast({
          background: "toast-fail",  
          message: "¡Parece que ya estas subscrito!",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
      handleToast({
        background: "toast-fail",
        message: "Algo salio mal, intentalo mas tarde",
        setShowToast,
        setBgToast,
        setToastMessage,
      });
    } finally {
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
        }}
        validate={(values: PropSub) => {
          const errors: Partial<PropSub> = {};

          if (!values.email) {
            errors.email = "¡El campo para el correo no puede quedar vacío!";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "¡Debe ingresar un correo válido!";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex items-center max-w-lg py-5 gap-4">
            <div className="relative z-0 w-full  group">
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
                Correco electronico
              </label>
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium rounded-lg border text-black hover:text-white transition duration-200 bg-secondary-bg hover:bg-[#d66a6e] uppercase  focus:outline-none  text-center"
            >
              {loading ? "Enviando..." : " Suscríbrirme"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
