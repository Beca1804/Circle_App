# 🟠 Circle Backend — Explicado para todos

¡Hola! Este es el **cerebro** de nuestra app. Aquí guardamos y leemos datos (como usuarios y publicaciones) usando **Node.js**, **Express** y **MongoDB**.

## 🧰 Qué necesitas
- **Node.js** (versión 18 o más nueva)
- **npm** (viene con Node)
- Internet (para conectar a la base de datos)

## 🪄 Cómo ponerlo a funcionar (paso a paso)
1. **Descarga** este proyecto y ábrelo en tu computadora.
2. **Instala** las piezas necesarias:
   ```bash
   npm install
   ```
3. **Crea** un archivo llamado `.env` copiando lo que hay en `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. **Inicia** el servidor:
   ```bash
   npm run dev
   ```
5. Abre tu navegador y ve a: `http://localhost:4000/`  
   Deberías ver algo como: `{ ok: true, message: "Circle Backend OK" }`

## 🧪 Cómo probar
- Ver **usuarios** (GET):
  - `GET http://localhost:4000/api/users`
- Crear **usuario** (POST):
  - `POST http://localhost:4000/api/users`
  - Cuerpo JSON:
    ```json
    { "name": "Leslie", "email": "leslie@example.com", "password": "123456" }
    ```
- Ver **posts** (GET):
  - `GET http://localhost:4000/api/posts`
- Crear **post** (POST):
  - `POST http://localhost:4000/api/posts`
  - Cuerpo JSON:
    ```json
    { "userId": "<ID de un usuario>", "content": "Hola mundo" }
    ```

## 🧱 ¿Qué hay adentro?
```
config/db.js        ← Conecta con la base de datos
models/User.js      ← Modelo de Usuario
models/Post.js      ← Modelo de Post
routes/users.js     ← Rutas /api/users
routes/posts.js     ← Rutas /api/posts
server.js           ← Inicia el servidor
.env.example        ← Tu plantilla de configuración
```
¡Listo! Con esto, **cualquier persona** del equipo puede correr el backend sin perderse.
