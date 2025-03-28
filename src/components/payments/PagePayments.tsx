import { DetallesCompra, DetallesUsuario } from "./Detalles";
import { useState, useEffect } from "react";
import type { Producto, Usuario } from "@/types";
import { calcularTotal } from "@/utils";
import { MercadoPago } from "./MercadopagoChechkout";

const DataPagePayments = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [envio, setEnvio] = useState<string | null>(null);
  const [datos, setDatos] = useState<Usuario>();

  let valorEnvio = 15000;

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const datos = JSON.parse(sessionStorage.getItem("data") || "[]");
    const datosEnvio = localStorage.getItem("value-car-forsend");
    setProductos(carrito);
    setDatos(datos);
    if (datosEnvio) {
      setEnvio(datosEnvio);
    }
  }, []);

  const totalConEnvio = calcularTotal(productos) + valorEnvio;

  return (
    <section className="grid grid-cols-1 md:flex mx-auto py-5 gap-2">
      <div className="w-full md:w-3/5">
        <p>aqui va el formulario de pago</p>
        {/* <MercadoPago envio={valorEnvio} products={productos} usuario={datos} /> */}
      </div>
      <div className="w-full md:w-2/5 flex flex-col">
        <DetallesCompra
          productos={productos}
          envio={valorEnvio}
          total={totalConEnvio}
        />
        <h3 className="text-center md:text-lg font-semibold text-gray-600 uppercase pt-3">
          Datos de envio
        </h3>
        <div className="border mt-3">
          <DetallesUsuario datos={datos} />
        </div>
      </div>
    </section>
  );
};

export default DataPagePayments;
