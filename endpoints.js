// Archivo: endpoints.js
// Descripción: Este archivo centraliza todos los endpoints del backend de Circle
// para que el frontend los use fácilmente al conectar los botones o componentes.

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

// 🧩 Endpoints de usuarios
export const USER_ENDPOINTS = {
  getAll: `${BASE_URL}/users`,          // GET → obtener lista de usuarios
  create: `${BASE_URL}/users`,          // POST → registrar usuario
  update: (id) => `${BASE_URL}/users/${id}`, // PUT → actualizar usuario
  delete: (id) => `${BASE_URL}/users/${id}`, // DELETE → eliminar usuario
};

// 🧩 Endpoints de publicaciones (posts)
export const POST_ENDPOINTS = {
  getAll: `${BASE_URL}/posts`,          // GET → obtener todas las publicaciones
  create: `${BASE_URL}/posts`,          // POST → crear nueva publicación
  update: (id) => `${BASE_URL}/posts/${id}`, // PUT → editar publicación
  delete: (id) => `${BASE_URL}/posts/${id}`, // DELETE → eliminar publicación
};

// 🧩 Endpoint raíz
export const ROOT_ENDPOINT = `${BASE_URL}/`;

// 📘 Uso en el frontend:
// import { USER_ENDPOINTS, POST_ENDPOINTS } from './endpoints';
// fetch(USER_ENDPOINTS.getAll).then(res => res.json()).then(console.log);
