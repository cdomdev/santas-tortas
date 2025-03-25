import { Formik, Field, ErrorMessage, Form } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "../Toast";
import { sendRequestResettPassword } from "@/lib/auth";
import { MessageForgotSend } from "./MessageForgotSend";
import { handleToast } from "@/utils";

interface ValuesForgotPassword {
  email: string;
}

interface DataForgotPassword {
  email: string;
  username: string;
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<boolean>();
  const [data, setData] = useState<DataForgotPassword>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  useEffect(() => {
    const dataSuccess = localStorage.getItem("isSuccessSend");
    if (dataSuccess) {
      let dataPase = JSON.parse(dataSuccess);
      setValue(dataPase);
    }
  }, []);

  const handleSubmit = async (values: ValuesForgotPassword) => {
    setIsLoading(true);
    try {
      const response = await sendRequestResettPassword(values);
      if (response?.status === 200) {
        setValue(true);
        setData(response.data);
        localStorage.setItem("isSuccessSend", JSON.stringify(true));
        localStorage.setItem("data", JSON.stringify(response));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        handleToast({
          background: "toast-fail",
          message: "Algo salio mal, intente de nuevo",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
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
      {value ? (
        <MessageForgotSend email={data?.email} name={data?.username} />
      ) : (
        <>
          <h1 className="text-base md:text-xl font-semibold mt-5 mb-10">
            Solicitud para restablecer contraseña
          </h1>
          <p className="text-sm md:text-base text-balance font-normal mb-14 ">
            Por motivos de seguridad, su clave olvidada debe ser reemplazada por
            una nueva. <br />
            Ingrese el correo con el que se registro en{" "}
            <strong>santas tortas</strong>
          </p>

          <div className="w-full md:w-[56%]">
            <Formik
              initialValues={{
                email: "",
              }}
              validate={(values: ValuesForgotPassword) => {
                const errors: Partial<ValuesForgotPassword> = {};
                if (!values.email) {
                  errors.email = "*Este campo no puede quedar vacio*";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                  errors.email = "Ingrese un correo electrónico válido";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="form-recovery" onSubmit={formik.handleSubmit}>
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

                  <button
                    type="submit"
                    className="text-black bg-secondary-bg hover:bg-[#d66a6e] uppercase  hover:text-white transition duration-200 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
                    disabled={formik.isSubmitting}
                  >
                    {isLoading ? "Enviando..." : "Enviar solicitud"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
