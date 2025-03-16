export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Producto = {
  id: number | string;
  title: string;
  price: string;
  discount: number | null;
  description: string;
  quantity?: number;
  slug: string
  images: Images[];
  category: {
    id: number;
    documentId: string;
    name: string;
  } 
};

export type Images = {
  id: number;
  documentId: string;
  url: string;
};



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
};

export type Personalizado = {
  tematica: string;
  relleno: string;
  sabor: string;
  fecha: string;
  porciones: string;
  foto?: File | null;
  mensaje: string;
};



export interface GoogleAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
  prompt?: string;
}
