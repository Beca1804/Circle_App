# Backend API – Next.js + MongoDB + Mongoose

Este proyecto implementa un backend modular desarrollado con Next.js API Routes y MongoDB (Mongoose).  
El sistema gestiona usuarios y publicaciones, permitiendo registro, inicio de sesión, creación de posts y consulta filtrada por usuario.

---

## Estructura del Proyecto

```text
backend_project/
│
├── lib/
│   └── dbConnect.js
│
├── models/
│   ├── User.js
│   └── Post.js
│
└── pages/
    └── api/
        ├── auth/
        │   ├── register.js
        │   └── login.js
        └── posts/
            ├── create.js
            ├── list.js
            └── user/
                └── [id].js
```

**Tecnologías usadas:**  
Next.js • Node.js • MongoDB • Mongoose • bcryptjs

---

## Configuración del Entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```bash
MONGODB_URI=tu_cadena_de_conexion
```

---

## Conexión a la Base de Datos

**Archivo:** `lib/dbConnect.js`  
Este módulo maneja la conexión única con MongoDB utilizando Mongoose y caching para optimizar rendimiento.

```javascript
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Define MONGODB_URI en .env.local');
```

**Ventajas:**
- Evita reconexiones múltiples.
- Centraliza la lógica de conexión.
- Maneja errores y promesas de forma controlada.

---

## Modelos de Datos

### Modelo `User`

**Archivo:** `models/User.js`  
Define los datos básicos del usuario:

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
```

### Modelo `Post`

**Archivo:** `models/Post.js`  
Estructura básica de una publicación:

```javascript
const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
```

---

### Diagrama de relación entre Usuario y Publicación

```text
+--------------------+          +----------------------+
|      User          |          |        Post          |
+--------------------+          +----------------------+
| _id : ObjectId     |<-------->| userId : ObjectId    |
| username : String  |   1  ──> * title : String       |
| email : String     |          | content : String     |
| password : String  |          | createdAt : Date     |
| createdAt : Date   |          | updatedAt : Date     |
+--------------------+          +----------------------+

Relación: Un usuario puede tener muchas publicaciones (1:N)
```

---

## Endpoints de la API

### Registro de Usuario

**Archivo:** `pages/api/auth/register.js`  
**Método:** `POST`  
**Ruta:** `/api/auth/register`

### Inicio de Sesión

**Archivo:** `pages/api/auth/login.js`  
**Método:** `POST`  
**Ruta:** `/api/auth/login`

### Crear Publicación

**Archivo:** `pages/api/posts/create.js`  
**Método:** `POST`  
**Ruta:** `/api/posts/create`

### Listar Todas las Publicaciones

**Archivo:** `pages/api/posts/list.js`  
**Método:** `GET`  
**Ruta:** `/api/posts/list`

### Listar Publicaciones de un Usuario

**Archivo:** `pages/api/posts/user/[id].js`  
**Método:** `GET`  
**Ruta:** `/api/posts/user/:id`

---

## Diagrama General de Dependencias entre Módulos

```text
                 +-------------------+
                 |   dbConnect.js    |
                 +---------+---------+
                           |
         +-----------------+-------------------+
         |                                     |
 +-------v-------+                     +-------v-------+
 |   User.js     |                     |   Post.js     |
 +-------+-------+                     +-------+-------+
         |                                     |
         |                                     |
 +-------v-------+                     +-------v-------+
 | register.js   |                     |  create.js    |
 | login.js      |                     |  list.js      |
 +-------+-------+                     |  [id].js      |
         |                             +---------------+
         |
         +--> Todos los módulos usan `dbConnect` para comunicarse con MongoDB
```

---

## Flujo de Uso Completo

1. Registro de usuario → `/api/auth/register`  
2. Inicio de sesión → `/api/auth/login`  
3. Creación de publicación → `/api/posts/create`  
4. Listado general → `/api/posts/list`  
5. Filtrado por usuario → `/api/posts/user/:id`

---

### Diagrama Secuencial del Flujo Completo

```text
+---------+         +-----------+         +-----------+         +-----------+
| Cliente |         | API Auth  |         | API Posts |         | MongoDB   |
+----+----+         +-----+-----+         +-----+-----+         +-----+-----+
     |                    |                     |                     |
     |--- Registro ------->|                     |                     |
     |<-- Confirmación ----|                     |                     |
     |                    |                     |                     |
     |--- Login ---------->|                     |                     |
     |<-- Token/Usuario ---|                     |                     |
     |                    |                     |                     |
     |--- Crear Post --------------------------->|                     |
     |<-- Post creado ---------------------------|                     |
     |                    |                     |                     |
     |--- Obtener lista ------------------------>|                     |
     |<-- Publicaciones ------------------------ |                     |
     |                    |                     |                     |
     |--- Obtener por usuario ----------------->|                     |
     |<-- Posts del usuario --------------------|                     |
     |                    |                     |                     |
```

---

## Conclusión

El backend implementa un sistema completo, modular y escalable para la gestión de usuarios y publicaciones.

**Ventajas principales:**
- Código limpio y separado por responsabilidad.
- Conexión segura y eficiente a MongoDB.
- Uso de `bcryptjs` para la seguridad de contraseñas.
- Integración fácil con frontend (Flask o React).

---

##Créditos


**Tecnologías:** Next.js • MongoDB • Mongoose • Node.js • bcryptjs


