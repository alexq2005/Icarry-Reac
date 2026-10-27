# Estructura del proyecto iCarry

Documento de referencia para el curso de React. Describe el estado actual del código, no un plan futuro.

## Qué es el proyecto

**iCarry** es una tienda SPA de artículos de Dota 2 (arcanas, personas, merchandising). Permite:

- Explorar el catálogo completo o filtrado por categoría
- Ver el detalle de un producto
- Agregar productos a un carrito (sin cantidades individuales)
- Confirmar la compra y registrar la orden en Firestore
- Administrar productos y consultar las órdenes desde `/admin`

El catálogo se consulta desde la colección `products` de Firestore. `public/data/products.json` queda como referencia de datos, pero no es la fuente activa de la tienda.

## Stack y cómo correrlo

| Pieza                       | Uso                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| React 19 + Vite 8           | UI y bundler                                                                                |
| React Router DOM 7          | Rutas SPA, layouts anidados y navegación                                                    |
| Context API                 | Estado global del carrito y autenticación (`CartProvider`, `AuthProvider`)                  |
| Firebase 12                 | Firestore para productos y órdenes; Firebase Auth para el acceso al administrador          |
| `src/services/`             | Acceso a Firestore y servicios externos, incluida la subida de imágenes                    |
| `src/utils/`                | Funciones auxiliares, como la validación del formulario de producto                         |
| `public/data/products.json` | Datos de referencia; no se usa para cargar el catálogo                                      |

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Otros scripts (`package.json`):

```bash
npm run build    # build de producción → dist/
npm run preview  # sirve el build localmente
npm run lint     # ESLint
```

## Recorrido paso a paso (primer lectura del código)

Guía corta para recorrer la app en orden la primera vez que abrís el proyecto. En cada paso abrí el archivo indicado en el editor y seguí el hilo hasta el siguiente.

### 1. Levantar el proyecto

En la raíz del repo corré `npm install` (si aún no lo hiciste) y después `npm run dev`. Vite te da una URL local (por ejemplo `http://localhost:5173`): abrila en el navegador y dejala al lado del editor. Así ves cada cambio mientras leés el código.

### 2. `main.jsx` — Router + proveedores

Abrí `src/main.jsx`. Acá se monta React en `#root`: `BrowserRouter` habilita las rutas SPA; `AuthProvider` comparte la sesión y `CartProvider` comparte el carrito. Ambos envuelven a `App`.

### 3. `App.jsx` — layouts y Routes

Abrí `src/App.jsx`. Las rutas públicas comparten `PublicLayout` (Header y Footer); `/admin` usa `AdminLayout` dentro de `ProtectedRoute`. Las pantallas se resuelven con `<Routes>` y layouts anidados.

### 4. `Nav` — links y categorías

Abrí `src/components/Nav/Nav.jsx` (el Header lo incluye). Los `NavLink` van a Inicio, Items del juego (`/category/items-del-juego`), Merchandising (`/category/merchandising`) y Carrito. Usan React Router, no `<a>`, para navegar sin recargar la página.

### 5. `ItemListContainer` — fetch, loading y filtro

Abrí `src/components/ItemListContainer/ItemListContainer.jsx`. Con `useEffect` llama a `getByCategory` de `src/services/productsService.js`, maneja loading y error, y si hay `:category` en la URL consulta solo esa categoría. Luego pasa `products` a `ItemList`. Probá Inicio vs. una categoría en el navegador para ver el filtro.

### 6. `ItemList` + `Item` — cards y Link al detalle

Abrí `src/components/ItemList/ItemList.jsx` y `src/components/Item/Item.jsx`. `ItemList` recorre el array y renderiza una tarjeta `Item` por producto. Cada card muestra imagen, nombre, precio y un `Link` a `/product/:id` para ir al detalle.

### 7. `ItemDetailContainer` + `ItemDetail` — detalle y addItem

Abrí `src/components/ItemDetailContainer/ItemDetailContainer.jsx` y `src/components/ItemDetail/ItemDetail.jsx`. El contenedor usa `getProductById` para buscar en Firestore por `:id` y se lo pasa a `ItemDetail`. Desde el detalle, el botón de agregar llama a `addItem` del contexto del carrito.

### 8. `CartContext` — estado del carrito

Abrí `src/context/CartContext.jsx`. Acá viven `cart`, `addItem`, `removeItem`, `clearCart`, `getTotalItems`, `getCartTotal` y `checkout`. `addItem` no duplica el mismo `id`; `getTotalItems` es `cart.length` (sin cantidades por ítem). Los componentes lo leen con `useCart()`.

### 9. `CartWidget` — badge

Abrí `src/components/CartWidget/CartWidget.jsx`. Muestra el ícono/texto del carrito y, si `getTotalItems() > 0`, un badge con esa cantidad. Está dentro del link a `/cart` en el Nav: agregá un producto y mirá cómo actualiza el número.

### 10. Carrito: View / List / Item / Summary

Abrí la carpeta `src/components/Cart/`: `CartView`, `CartList`, `CartItem` y `CartSummary`. Si el carrito está vacío, `CartView` muestra el mensaje con 😕 y un link a Inicio; si hay productos, listás, eliminás (`removeItem`), ves el total y confirmás con `checkout`.

### 11. `services/productsService.js` + `firebase/config.js` — acceso al catálogo

`src/firebase/config.js` inicializa Firebase y exporta Firestore y Auth. `src/services/productsService.js` lista, filtra, busca, crea, actualiza y elimina productos; también registra y consulta órdenes. `src/services/uploadImage.js` contiene la integración de subida de imágenes. La validación del formulario está separada en `src/utils/validateProduct.js`.

### 12. Administración

`src/components/ProtectedRoute/ProtectedRoute.jsx` espera la resolución de Firebase Auth y protege las rutas administrativas. `Dashboard`, `Products`, `ProductFormContainer` y `Orders` componen el panel. El formulario concentra el estado y las operaciones; `ProductFormUI` presenta los campos y mantiene la identidad visual de iCarry.


## Árbol de carpetas

```text
.
├── index.html
├── package.json
├── public/
│   └── data/
│       └── products.json      ← datos de referencia, no usados por la tienda
├── src/
│   ├── main.jsx               ← entry: Router + AuthProvider + CartProvider + App
│   ├── App.jsx                ← rutas públicas y privadas
│   ├── App.css
│   ├── index.css
│   ├── assets/                ← logo y fondos
│   ├── components/
│   │   ├── Cart/              ← vista /cart (List, Item, Summary, View)
│   │   ├── CartWidget/        ← badge de cantidad en el Nav
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Item/              ← tarjeta reutilizable + formatPrice
│   │   ├── ItemDetail/
│   │   ├── ItemDetailContainer/
│   │   ├── ItemList/
│   │   ├── ItemListContainer/
│   │   ├── Login/
│   │   ├── ProtectedRoute/
│   │   ├── adminComponents/
│   │   │   ├── Dashboard/
│   │   │   ├── Orders/
│   │   │   ├── ProductForm/
│   │   │   ├── Products/
│   │   │   └── ProductSuccess.jsx
│   │   └── Nav/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── services/
│   │   ├── productsService.js ← productos y órdenes de Firestore
│   │   └── uploadImage.js     ← subida de imágenes
│   ├── utils/
│   │   └── validateProduct.js ← validación del formulario
│   └── firebase/
│       └── config.js          ← inicializa Firebase, Firestore y Auth
```

## Flujo de datos

```text
Firestore: colecciones `products` y `orders`
     │
     ├─ getByCategory en ItemListContainer ──► filtro opcional por :category ──► ItemList ──► Item
     │                                                                              │
     │                                                                              └─ Link → /product/:id
     │
     ├─ getProductById en ItemDetailContainer ──► busca por :id ──► ItemDetail ──► Item
                                                              │
                                                              └─ addItem(item) → CartContext
                                                                                     │
                                                                                     ├─ CartWidget (badge)
                                                                                     └─ CartView → CartList / CartItem / CartSummary

CartContext ── checkout() ──► createOrder ──► Firestore: colección `orders`
Firebase Auth ──► AuthContext ──► ProtectedRoute ──► AdminLayout
```

Resumen:

1. **Datos**: `productsService.js` consulta la colección `products` en Firestore; `createProduct` agrega documentos nuevos.
2. **Contenedores**: cargan, manejan loading/error y filtran o buscan.
3. **Presentación**: `ItemList` / `ItemDetail` arman la UI con la tarjeta `Item`.
4. **Carrito**: `ItemDetail` llama `addItem`; el estado vive en `CartContext` y lo consumen widget, lista y resumen.

Campos esperados de cada documento de producto: `name`, `description`, `price`, `image`, `category` (`items-del-juego` | `merchandising`). Firestore aporta el `id` del documento.

## Rutas

Declaradas en `src/App.jsx`. Las rutas públicas comparten `PublicLayout`, que contiene `Header` y `Footer`. La administración está bajo `AdminLayout` y pasa por `ProtectedRoute`.

| Ruta                               | Componente                 | Qué hace                                  |
| ---------------------------------- | -------------------------- | ----------------------------------------- |
| `/`                                | `ItemListContainer`        | Catálogo completo                         |
| `/category/:category`              | `ItemListContainer`        | Catálogo filtrado por categoría           |
| `/product/:id`                     | `ItemDetailContainer`      | Detalle por `id`                          |
| `/cart`                            | `CartView`                 | Carrito o mensaje vacío                   |
| `/admin/login`                     | `Login`                    | Inicio de sesión                          |
| `/admin`                           | `Dashboard`                | Panel de administración                   |
| `/admin/products`                  | `Products`                 | Listado, edición y eliminación            |
| `/admin/products/new`              | `ProductFormContainer`     | Alta de producto                          |
| `/admin/products/:id/edit`         | `ProductFormContainer`     | Edición de producto                       |
| `/admin/products/success/:id`      | `ProductSuccess`           | Confirmación de alta                      |
| `/admin/orders`                    | `Orders`                   | Órdenes registradas                       |

Navegación en `Nav.jsx`: Inicio, Items del juego, Merchandising, Carrito (`CartWidget`).

## Carrito

Todo el estado está en `src/context/CartContext.jsx`, proveído desde `main.jsx`.

| API               | Comportamiento                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `addItem(item)`   | Agrega solo si el `id` no está; si ya existe, alerta y no duplica                                        |
| `removeItem(id)`  | Quita ese producto                                                                                       |
| `clearCart()`     | Vacía el array                                                                                           |
| `getTotalItems()` | `cart.length` — **no hay cantidades por ítem** (cada producto entra una sola vez)                        |
| `getCartTotal()`  | Suma en **centavos** (`Math.round(price * 100)`) y divide por 100, para evitar errores de punto flotante |
| `checkout()`      | Registra una orden en Firestore; solo si tiene éxito vacía el carrito y navega a `/`                     |

Componentes:

- `CartView` — página; vacío → link a inicio
- `CartList` / `CartItem` — una tarjeta `Item` por producto + botón Eliminar
- `CartSummary` — total formateado + “Finalizar compra”
- `CartWidget` — badge solo si `getTotalItems() > 0`

## Firebase: estado real

- `src/firebase/config.js` inicializa la configuración actual de Firebase y exporta `db` (Firestore) y `auth`.
- `src/services/productsService.js` usa `db` para consultar y administrar productos y para registrar y consultar órdenes.
- `src/services/uploadImage.js` centraliza la subida de imágenes usada por el formulario de productos.
- `src/utils/validateProduct.js` mantiene las validaciones fuera de la vista y del acceso a Firebase.
- La carga de datos requiere que la colección exista y que las reglas de Firestore permitan las operaciones necesarias.

No edites `.env.local` desde la documentación; la config actual está en el archivo JS del módulo.

## Convenciones

### Comentarios por sección

Los JSX usan bloques tipo:

```text
/*------------------------------------------------------------*/
/*                     nombre de la sección                    */
/*------------------------------------------------------------*/
```

y, dentro del componente, marcas como `/*----- params y estado -----*/`. Sirven para ubicar rápido cada parte en clase; mantené el estilo al agregar archivos.

### CSS

- Estilos por carpeta de componente (`Item.css`, `Cart.css`, etc.).
- Globales / tipografía / botones: `index.css`.
- Fondos de página: `App.css` + imágenes en `src/assets/`.

### Imágenes de producto

La misma tarjeta `Item` se usa en listado, detalle y carrito.

1. Cambiar archivo/URL → campo `image` del documento de producto en Firestore.
2. Estilo base de imagen/tarjeta → `Item.css` (`.card`, `.card img`).
3. Columnas del catálogo → `ItemList.css` (`.products-container`).
4. Ancho del detalle → `ItemDetail.css` (`max-width` del wrapper).
5. Tamaño en carrito → `Cart.css` (reglas bajo `.cart-items-container`).
6. Logo → `Header.jsx` + `Header.css`.

## Notas de UI recientes

- **Grilla del catálogo**: `grid-template-columns: repeat(3, minmax(0, 1fr))` en `ItemList.css`, con breakpoints a 2 columnas (≤920px) y 1 columna (≤600px). `minmax(0, 1fr)` evita que el contenido desborde la celda.
- **Precios con 2 decimales**: `Item.jsx` define `formatPrice` con `Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2 })`. `CartSummary` usa el mismo criterio para el total.
- **Comentarios por sección**: presentes en App, containers, carrito, Item, Nav, Header, Footer y `firebase/config.js`.
- **Carrito vacío**: en `CartView.jsx`, el mensaje vacío usa el emoji 😕 (`El carrito está vacío 😕`) y un `Link` a `/`.
