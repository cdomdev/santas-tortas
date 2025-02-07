export type UUID = `${string}-${string}-${string}-${string}-${string}`

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
  
  export type Usuario = {
    id?: UUID;
    nombre: string;
    apellidos?: string;
    email: string;
    telefono?: string;
    direccion?: string;
    ciudad?: string;
    estado?: string;
    message?: string;
    codigoPostal?: string;
  }


 export  type Personalizado = {
    tematica: string;
    relleno: string;
    sabor: string;
    fecha: string;
    porciones: string;
    foto?: File | null;
    mensaje: string;
  };