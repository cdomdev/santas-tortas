import type { Producto, Usuario } from "@/types";
import { query } from "./strapi";

interface PropsPayment {
  products: Producto[];
  envio: number;
  usuario?: Usuario;
}

export async function checkoutMercadopago({
  products,
  envio,
  usuario,
}: PropsPayment) {
  const response = query(`/personalized-orders-custom`, "POST", {
    data: {
      tematica: "Fiesta de unicornios",
      relleno: "Crema de vainilla",
      sabor: "Chocolate",
      porciones: 10,
      fecha_estimada: "2025-04-10",
      detalles: "Quiero un pastel con forma de unicornio y colores pastel",
      idea_de_referencia:
        "https://res.cloudinary.com/dd7gtmrax/image/upload/v1741634927/galletas_de_mantequilla_clasicas_3_1024x685_e58cf7142b.jpg",
      users_permissions_user: 2,
    },
  });
  console.log("data del payment", response);
  //   return (await response).data;
}
