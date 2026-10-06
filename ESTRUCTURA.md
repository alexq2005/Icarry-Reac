# Estructura del proyecto iCarry

iCarry es una tienda de artículos de Dota 2 construida con React y Vite. La aplicación permite explorar productos, ver sus detalles y agregarlos a un carrito.

## Árbol de carpetas

```text
.
├── index.html
├── package.json
├── public/
│   └── data/
│       └── products.json
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── logo.svg
    │   ├── fondo.jpg
    │   ├── fondo1.jpg
    │   ├── fondo2.jpg
    │   └── fondo3.jpg
    ├── components/
    │   ├── Cart/
    │   ├── CartWidget/
    │   ├── Footer/
    │   ├── Header/
    │   ├── Item/
    │   ├── ItemDetail/
    │   ├── ItemDetailContainer/
    │   ├── ItemList/
    │   ├── ItemListContainer/
    │   └── Nav/
    ├── context/
    │   └── CartContext.jsx
    └── firebase/
        └── config.js
```

## Archivos principales

- **`index.html`**: documento HTML inicial. Contiene el elemento `root`, donde React monta la aplicación, y carga las fuentes.
- **`src/main.jsx`**: punto de entrada de React. Configura el enrutador y envuelve la aplicación en `CartProvider` para compartir el estado del carrito.
- **`src/App.jsx`**: organiza la cabecera, el contenido y el pie de página; también define las rutas.
- **`src/App.css`**: estilos generales y fondos del sitio.
- **`src/index.css`**: estilos base, tipografía, layout principal, botones y reglas globales.
- **`package.json`**: dependencias y comandos disponibles con npm.
- **`src/firebase/config.js`**: módulo donde se inicializa Firebase.

## ¿Qué maneja cada sección?

### Inicio, categorías y catálogo

- **`src/components/ItemListContainer/ItemListContainer.jsx`** carga los productos y filtra por categoría cuando la ruta la especifica.
- **`src/components/ItemList/ItemList.jsx`** organiza los productos en una grilla y enlaza cada tarjeta con su detalle.
- **`src/components/ItemListContainer/ItemListContainer.css`** y **`src/components/ItemList/ItemList.css`** controlan la presentación y distribución del catálogo.

### Detalle de un producto

- **`src/components/ItemDetailContainer/ItemDetailContainer.jsx`** busca el producto indicado por el identificador de la URL.
- **`src/components/ItemDetail/ItemDetail.jsx`** muestra el producto y permite agregarlo al carrito.
- **`src/components/ItemDetail/ItemDetail.css`** ajusta el ancho y la presentación de la tarjeta en esta página.

### Carrito

- **`src/context/CartContext.jsx`** mantiene los productos del carrito y sus acciones: agregar, quitar, vaciar, calcular el total y confirmar la compra.
- **`src/components/Cart/CartView.jsx`** presenta el carrito o el mensaje de carrito vacío.
- **`src/components/Cart/CartList.jsx`** genera una tarjeta por cada producto.
- **`src/components/Cart/CartItem.jsx`** muestra el producto y su botón para eliminarlo.
- **`src/components/Cart/CartSummary.jsx`** muestra el resumen y las acciones de compra.
- **`src/components/Cart/Cart.css`** controla el diseño y el tamaño de las tarjetas dentro del carrito.
- **`src/components/CartWidget/CartWidget.jsx`** muestra el indicador de cantidad de productos en el menú.

### Elementos compartidos del sitio

- **`src/components/Item/Item.jsx`** es la tarjeta reutilizable del producto. Se usa en el catálogo, el detalle y el carrito.
- **`src/components/Item/Item.css`** controla el estilo general de esa tarjeta, su imagen, textos y botón.
- **`src/components/Header/`** contiene la cabecera y su estilo.
- **`src/components/Nav/`** contiene la navegación y su estilo.
- **`src/components/Footer/`** contiene el pie de página y su estilo.

## ¿Dónde cambio las imágenes?

La imagen del producto se define en los datos y se reutiliza en las distintas pantallas. No hay una imagen independiente para el catálogo, el detalle y el carrito.

1. **Imagen de un producto**: cambia el campo `image` del producto correspondiente en **`public/data/products.json`**. El valor puede ser una URL o la ruta de un archivo estático publicado desde `public/`.
2. **Cómo aparece la imagen del producto**: **`src/components/Item/Item.jsx`** la renderiza. Sus dimensiones y el recorte general se controlan en la regla `.card img` de **`src/components/Item/Item.css`**.
3. **Imagen en el catálogo**: usa la imagen del producto; sus dimensiones parten de `Item.css`. La grilla se ajusta en **`src/components/ItemList/ItemList.css`**.
4. **Imagen en el detalle**: es la misma imagen del producto. El tamaño de la tarjeta se ajusta en **`src/components/ItemDetail/ItemDetail.css`**; el tamaño de la imagen parte de `Item.css`.
5. **Imagen en el carrito**: también es la misma imagen. **`src/components/Cart/Cart.css`** puede sobrescribir su altura específicamente dentro del carrito.
6. **Logo de la cabecera**: el componente **`src/components/Header/Header.jsx`** importa `src/assets/logo.svg`.
7. **Fondos de las páginas**: los archivos `src/assets/fondo.jpg` y `fondo1.jpg` a `fondo3.jpg` se usan desde **`src/App.css`**.

## Rutas de la aplicación

Las rutas están declaradas en `src/App.jsx`:

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio y catálogo completo |
| `/cart` | Carrito de compras |
| `/product/:id` | Detalle del producto identificado por `id` |
| `/category/:category` | Catálogo filtrado por categoría |

## Datos de los productos

El catálogo está en **`public/data/products.json`**. Cada producto contiene:

- `id`: identificador usado para encontrar el producto y generar su ruta de detalle.
- `name`: nombre que se muestra en la tarjeta.
- `description`: descripción.
- `price`: precio.
- `image`: URL o ruta de la imagen.
- `category`: categoría, por ejemplo `items-del-juego` o `merchandising`.

## Comandos para trabajar en el proyecto

Ejecuta estos comandos desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Otros comandos disponibles:

```bash
npm run build    # genera la versión de producción
npm run preview  # sirve localmente la versión compilada
npm run lint     # revisa el código con ESLint
```
