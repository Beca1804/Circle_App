# Backend Project

Este backend implementa las rutas de autenticación y manejo de publicaciones usando Next.js API Routes y MongoDB con Mongoose.

## Estructura de carpetas:
- lib/dbConnect.js
- models/User.js
- models/Post.js
- pages/api/auth/register.js
- pages/api/auth/login.js
- pages/api/posts/create.js
- pages/api/posts/list.js
- pages/api/posts/user/[id].js

Configura tu **.env.local** con la variable:
```
MONGODB_URI=tu_cadena_de_conexion
```
