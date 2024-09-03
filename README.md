# Challenge Full-Stack - Backend (NestJS)

## Funcionalidades

- **Gestión de productos:** Permite crear, leer, actualizar y eliminar productos.
- **Carrito de compras:** Permite agregar, eliminar y modificar la cantidad de productos en el carrito de un usuario, así como calcular el precio total.
- **Umbral de envío:** Define el umbral para obtener envío gratuito.
- **Autenticación JWT:** Implementa autenticación de usuarios mediante tokens JWT.
- **Base de datos:** Se utiliza una base de datos SQLite llamada database.sqlite. Se creará automáticamente si no existe.

1. **Instalar dependencias::**

```bash
npm install
```

2. **Ejecución:**

- Contruir imagenes de Docker:

```bash
docker-compose build
```

- Iniciar contenedores:

```bash
docker-compose up
```

- Ejecutar el servidor en el entorno local sin Docker:

```bash
npm run build
```

```bash
npm run start
```

3. **Autenticación:**

- Nombre de usuario: _admin_
- Contraseña: _12345_

4. **Endpoints:**

- GET /products: Obtener todos los productos.
- GET /products/:id: Obtener un producto por su ID.
- POST /products: Crear un nuevo producto.
- PATCH /products/:id: Actualizar un producto existente.
- DELETE /products/:id: Eliminar un producto.
- POST /cart/add-product: Agregar un producto al carrito.
- DELETE /cart/remove-product/:productId: Eliminar un producto del carrito.
- PATCH /cart/change-quantity/:productId: Cambiar la cantidad de un producto en el carrito.
- GET /cart/items-count: Obtener el número de productos en el carrito.
- GET /cart/total-price: Calcular el precio total del carrito.
- GET /shipping-threshold: Obtener el umbral para envío gratuito.
- POST /auth/login: Iniciar sesión y obtener un token JWT.
- POST /users: Crear un nuevo usuario (no implementado en el frontend).
