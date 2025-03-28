import { Formik, Form, Field, ErrorMessage } from "formik";

interface Values {
  tematica: string;
  relleno: string;
  sabor: string;
  porciones: string;
  fecha_estimada: string;
  mensaje: string;
  image: File | null;
}

const FormDatosProducto = () => {
  const handleSubmit = (values: Values, { setSubmitting }: any) => {
    setSubmitting(false);
    window.sessionStorage.setItem("data", JSON.stringify(values));
    window.location.href = "/personalizados/datos-de-usuario"
  };

  return (
    <Formik
      initialValues={{
        tematica: "",
        relleno: "",
        sabor: "",
        porciones: "",
        fecha_estimada: "",
        mensaje: "",
        image: null as File | null,
      }}
      validate={(values: Values) => {
        const errors: Partial<Values> = {};
        if (!values.tematica)
          errors.tematica = "¡Este campo no puede quedar vacío!";
        if (!values.relleno)
          errors.relleno = "¡Este campo no puede quedar vacío!";
        if (!values.sabor) errors.sabor = "¡Este campo no puede quedar vacío!";
        if (!values.fecha_estimada)
          errors.fecha_estimada = "¡Este campo no puede quedar vacío!";
        if (!values.porciones)
          errors.porciones = "¡Este campo no puede quedar vacío!";
        if (!values.mensaje)
          errors.mensaje = "¡Este campo no puede quedar vacío!";
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="tematica"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                form="tematica"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ¿Cuál será tu temática?
              </label>
              <ErrorMessage
                name="tematica"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="relleno"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                form="relleno"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ¿Algún relleno en especial?
              </label>
              <ErrorMessage
                name="relleno"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="sabor"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                form="sabor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ¿En qué sabor te gustaría la torta?
              </label>
              <ErrorMessage
                name="sabor"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group flex flex-col">
              <label
                htmlFor="fecha"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                ¿Para cuándo lo necesitas?
              </label>
              <Field
                type="date"
                name="fecha_estimada"
                id="fecha"
                className="input wfull rounded-md border-gray-400 text-gray-600 focus:border-[#eb9f48] focus:ring-[#eb9f48]"
                value={formik.values.fecha_estimada || ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue("fecha_estimada", event.target.value)
                }
              />
              <ErrorMessage
                name="fecha_estimada"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="number"
                name="porciones"
                min="1"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48] peer"
                placeholder=" "
                required
              />
              <label
                form="porciones"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#eb9f48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ¿De cuántas porciones quieres tu torta?
              </label>
              <ErrorMessage
                name="porciones"
                component="span"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                ¿Algún diseño en mente?
              </label>

              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(event) => {
                  const file = event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null;
                  formik.setFieldValue("image", file);
                }}
              />

              <label
                htmlFor="image"
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 px-4 rounded-md w-full text-center text-sm flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  className="w-5 h-5 mr-1"
                  strokeWidth="2"
                >
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 9l5 -5l5 5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                Seleccionar archivo
              </label>

              <div className="mt-1 text-sm text-gray-500 text-center">
                {formik.values.image instanceof File
                  ? formik.values.image.name
                  : "No hay archivo seleccionado"}
              </div>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              form="message"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Cuantanos un poco de tu idea
            </label>
            <Field
              as="textarea"
              name="mensaje"
              id="mensaje"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#eb9f48] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#eb9f48] focus:outline-none focus:ring-0 focus:border-[#eb9f48]"
              placeholder="Mensaje..."
            />

            <ErrorMessage
              name="mensaje"
              component="span"
              className="text-red-600 text-xs"
            />
          </div>

          <button
            type="submit"
            className={
              "text-black hover:text-white transition duration-200 bg-secondary-bg hover:bg-[#d66a6e] uppercase focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            }
          >
            Guardar y continuar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormDatosProducto;
