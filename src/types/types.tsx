
export type Producto = {
    id: string;
    nombre: string;
    imagen: string;
    precio: string;
    descuento: number | null;
    description: string;
    referencia: string;
    categoria: any | null;
    quantity?: number
  }
  