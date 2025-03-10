import { useEffect, useState } from "react";
import { eventEmitter } from "@/events";

interface PropDrop {
  isAuthenticated: boolean;
}

const DropDown = ({ isAuthenticated }: PropDrop) => {
  const [auth, setAuth] = useState(isAuthenticated);

  useEffect(() => {
    const handleDrop = () => {
      console.log("Escuchando evento de cambio de sesión...");
      setAuth((prev) => !prev); 
    };

    if (eventEmitter) {
      eventEmitter.on("changeSesion", handleDrop);
    }

    return () => {
      if (eventEmitter) {
        eventEmitter.off("changeSesion", handleDrop);
      }
    };
  }, []);

  return (
    <>
      {auth ? (
        <a
          href={`/profile/${"carlos"}`}
          className="flex items-center gap-y-1 flex-col"
          id="item-profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            className="size-7 md:size-8"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
          >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <span className="sr-only">Perfil</span>
          <span className="hidden md:block text-xs -mt-1 text-black">
            Perfil
          </span>
        </a>
      ) : (
        <a href="/acount/login" className="flex items-center gap-y-1 flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            className="size-7 md:size-8"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
          >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <span className="sr-only">Cuenta</span>
          <span className="hidden md:block text-xs -mt-1 text-black">
            Cuenta
          </span>
        </a>
      )}
    </>
  );
};

export default DropDown;
