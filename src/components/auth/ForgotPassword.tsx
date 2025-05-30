import axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { Toast } from "../Toast";
import { resetPassword } from "@/lib/auth";
import { handleToast } from "@/utils";

interface FormResetPasswordProps {
  token: string;
}
interface ValuesPassWords {
  password: string;
  password2: string;
}

const FormResetPassword = ({ token }: FormResetPasswordProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [bgToast, setBgToast] = useState<string>("");

  useEffect(() => {
    const send = sessionStorage.getItem("processSucces") || null;
    if (send) {
      const dataPerse = JSON.parse(send);
      setSuccess(dataPerse);
    }
  }, []);

  const handleSubmit = async (values: ValuesPassWords) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(values, token);
      if (response?.status === 200) {
        setSuccess(true);
        sessionStorage.setItem("processSucces", JSON.stringify(true));
      } else if (response?.status === 401 || response?.status === 403) {
        handleToast({
          background: "toast-fail",
          message:
            "¡El token expiro!,  por favor realice una nueva peticion para el cambio de su contraseña",
          setShowToast,
          setBgToast,
          setToastMessage,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        if (status === 500) {
          handleToast({
            background: "toast-fail",
            message: `Algo salio mal con el inicio de sesion, intentelo mas tarde`,
            setShowToast,
            setBgToast,
            setToastMessage,
          });
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
      {success ? (
        <div className="flex flex-col items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-check size-14"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00b341"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          </span>
          <h1 className="text-sm md:text-base font-normal">
            Tu contraseña se actuilizo con exito, ya puedes iniciar sesion en
            santas tortas
          </h1>
          <div className="flex max-w-64 mx-auto pt-10">
            <button
              id="btn-clear"
              onClick={() => {
                sessionStorage.removeItem("processSucces");
                window.location.href = "/";
              }}
              type="button"
              className="flex items-center gap-x-1 justify-center font-medium text-xs md:text-base px-3 py-2 text-center w-full bg-white border text-black border-black hover:bg-[#f1683a] hover:text-white duration-300 group transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                className="group-hover:-translate-x-1"
                stroke-width="2"
              >
                <path d="M5 12l14 0"></path>
                <path d="M5 12l4 4"></path>
                <path d="M5 12l4 -4"></path>
              </svg>
              Volver a la tienda
            </button>
          </div>
        </div>
      ) : (
        <div className="container-recovery">
          <h1 className="text-center mb-10 text-base md:text-xl font-semibold">
            Solicitud para restablecer contraseña
          </h1>
          <h2 className="font-normal text-sm md:text-base mb-5">
            A continuación encontrará un formulario para restablecer su
            contraseña, para mejorar la seguridad de su nueva contraseña,
            tenemos algunos puntos que queremos que tenga en cuenta:
          </h2>
          <ol className="text-sm md:text-base pl-5 mb-10 list-disc">
            <li className="text-balance">Ingrese una nueva contraseña</li>
            <li className="text-balance">Confirme la contraseña</li>
            <li className="text-balance">
              La contraseña debe contener al menos una mayúscula, una minúscula,
              un número y tener un mínimo de 5 y un máximo de 10 caracteres
            </li>
          </ol>

          <Formik
            initialValues={{
              password: "",
              password2: "",
            }}
            validate={(values: ValuesPassWords) => {
              const errors: Partial<ValuesPassWords> = {};
              if (!values.password) {
                errors.password = "Se requiere una contraseña";
              } else if (
                !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,10}$/.test(values.password)
              ) {
                errors.password =
                  "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener un minimo de 5 y un máximo de 10 caracteres";
              }
              if (!values.password2) {
                errors.password2 = "Se requiere confirmar la contraseña";
              } else if (values.password !== values.password2) {
                errors.password2 = "Las contraseñas deben coincidir";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="form-recovery" onSubmit={formik.handleSubmit}>
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
                    name="password2"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password2"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirma tu contraseña
                  </label>

                  <ErrorMessage
                    name="password2"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="text-black bg-secondary-bg hover:bg-[#d66a6e] uppercase  hover:text-white transition duration-200 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
                  disabled={formik.isSubmitting}
                >
                  {isLoading ? (
                    "Cambio en proceso..."
                  ) : (
                    <>Restablecer contraseña</>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default FormResetPassword;
