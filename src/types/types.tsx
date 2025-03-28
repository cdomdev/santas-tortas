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


export interface PersonalizedOrder {
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  message: string;
  datos: DatosPedido;
}

export interface DatosPedido {
  tematica: string;
  relleno: string;
  sabor: string;
  porciones: number;
  fecha_estimada: string; 
  mensaje: string;
  image: string | null; 
}

export interface GoogleAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
  prompt?: string;
}
