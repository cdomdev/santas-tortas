interface PropMail {
  email: string | undefined;
  name: string | undefined;
}


export const MessageForgotSend = ({ email, name }: PropMail) => {
  const removeData = () => {
    localStorage.removeItem("isSuccessSend");
  };

  return (
    <div className="flex flex-col justify-center items-center text-center mx-auto">
      <h1 className="text-sm md:text-lg text-center font-semibold mt-4 mb-10">
        ¡Tu informacion ah sido valida con exito!
      </h1>
      <p className="text-sm md:text-base font-normal text-balance mb-10">
        Hola <strong>{name}</strong>, en los proximos minutos enviaremos a tu correo: <strong>{email}</strong> la informacion
       con las instrucciones para que puedas crear una
        nueva contraseña.
      </p>
      <a
        href="/"
        onClick={removeData}
        className="text-black bg-secondary-bg hover:bg-[#d66a6e] uppercase  hover:text-white transition duration-200 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4 max-w-[50%]"
      >
        Volver a la pagina de inicio
      </a>
    </div>
  );
};
