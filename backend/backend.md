# Documentación del Backend (Paso a Paso)

Este documento explica **cómo se creó** y **cómo funciona** el backend. Incluye diagramas simples.

---

## 1) Objetivo
Crear un backend que:
- Conecte a **MongoDB Atlas**.
- Exponga endpoints para **usuarios** y **posts**.
- Sea fácil de ejecutar por todo el equipo.

---

## 2) Diagrama general (cómo se conecta todo)

```
[ Navegador / Frontend ]
           |
           v
     (HTTP: JSON)
           |
     [ Express (Node.js) ]
           |
           v
      [ Controladores ]
           |
           v
        [ Modelos ]
           |
           v
       [ MongoDB ]
```

- **Frontend** pide o envía datos.
- **Express** recibe la petición y llama a un **Controlador**.
- El **Controlador** usa un **Modelo** para hablar con **MongoDB**.
- Respuesta vuelve al **Frontend**.

---

## 3) Instalación (qué hicimos)
1. Creamos `package.json` y agregamos dependencias:
   - `express`, `mongoose`, `cors`, `dotenv`
2. Creamos la conexión en `config/db.js`.
3. Definimos **Modelos**: `User.js` y `Post.js`.
4. Creamos **Controladores** para manejar la lógica.
5. Creamos **Rutas** para atender las URLs:
   - `/api/users`
   - `/api/posts`
6. Armamos `server.js` para iniciar el servidor.

---

## 4) Diagrama de carpetas

```
backend/
├─ config/
│  └─ db.js
├─ controllers/
│  ├─ postController.js
│  └─ userController.js
├─ models/
│  ├─ Post.js
│  └─ User.js
├─ routes/
│  ├─ posts.js
│  └─ users.js
├─ .env.example
├─ .gitignore
├─ package.json
├─ README.md
└─ server.js
```

---

## 5) Flujo de una petición (ejemplo crear un usuario)

```
POST /api/users
       |
       v
[ routes/users.js ] -----> llama a -----> [ controllers/userController.createUser ]
       |
       v
[ models/User.js ] (Mongoose) -----> guarda en -----> [ MongoDB Atlas ]
       |
       v
 Respuesta JSON: 201 Created + datos del usuario
```

**Código clave (resumen):**
```js
// controllers/userController.js
const User = require('../models/User');

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
}
```

---

## 6) Variables de entorno

En `.env` definimos:
```
MONGODB_URI="mongodb+srv://lesliesosa:1234@cluster0.lnff1me.mongodb.net/circleDB?retryWrites=true&w=majority"
JWT_SECRET="cambia_este_secreto_largo_unico"
JWT_EXPIRES_IN="7d"
PORT=4000
```

> **Nota:** En este ejemplo el middleware `auth` solo verifica que exista un token en headers. Puedes integrar JWT real con `jsonwebtoken` cuando lo necesites.

---

## 7) Endpoints (resumen)

### Usuarios
- `POST /api/users` → Crea un usuario.
- `GET /api/users` → Lista usuarios (sin contraseñas).

### Posts
- `POST /api/posts` → Crea un post (requiere `userId`).
- `GET /api/posts` → Lista posts con datos del usuario.

---

## 8) Diagrama de datos (simplificado)

```
User
- _id: ObjectId
- name: String
- email: String (único)
- password: String

Post
- _id: ObjectId
- userId: ObjectId (ref a User)
- content: String
```

Relación: **Un Usuario** puede tener **muchos Posts**.

---

## 9) Pruebas rápidas con curl

```bash
# Crear usuario
curl -X POST http://localhost:4000/api/users  -H "Content-Type: application/json"  -d '{"name":"Leslie","email":"leslie@example.com","password":"123456"}'

# Listar usuarios
curl http://localhost:4000/api/users

# Crear post (reemplaza <ID> por el _id del usuario creado)
curl -X POST http://localhost:4000/api/posts  -H "Content-Type: application/json"  -d '{"userId":"<ID>","content":"Hola mundo"}'

# Listar posts
curl http://localhost:4000/api/posts
```

---

## 10) Próximos pasos (si quieres JWT real)
1. Instalar `jsonwebtoken` y `bcryptjs`.
2. Crear rutas `/auth/register` y `/auth/login`.
3. Generar y verificar tokens en el middleware.

---

¡Listo! Con esto puedes entender y mantener el backend fácilmente.
