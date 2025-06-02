import { query } from "./strapi";

interface PropsPayment {
  products: any[];
  envio: number;
  usuario?: any;
}
export async function checkoutMercadopago({
  products,
  envio,
  usuario,
}: PropsPayment) {
  try {
    return query(
      `/payment/create-order-mercadopago`,
      "POST",
      { products, envio, usuario },
      true
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
