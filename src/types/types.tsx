type UUID = `${string}-${string}-${string}-${string}-${string}`

export type Producto = {
    id: UUID;
    nombre: string;
    imagen: string;
    precio: string;
    descuento: number | null;
    descripcion: string;
    referencia: string | number;
    categoria: any | null;
    quantity?: number
  }
  