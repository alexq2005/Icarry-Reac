# iCarry — Tienda Dota 2

Tienda online de items de Dota 2 hecha con **React + Vite** y **React Router**.

## Scripts

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # build de produccion en /dist
npm run lint    # eslint
```

## Estructura

```
public/
  data/products.json    # productos: id, name, description, price, image, category, details
src/
  main.jsx              # BrowserRouter + CartProvider
  App.jsx               # rutas
  context/CartContext.jsx  # carrito (localStorage) y avisos (toast)
  components/
    Header, Nav, Footer
    ItemListContainer / ItemList / Item      # listado (y filtro por categoria)
    ItemDetailContainer / ItemDetail         # detalle del producto
    Cart, Contact, Toast
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Home con todos los productos |
| `/category/:category` | Productos filtrados (`items-del-juego`, `merchandising`) |
| `/product/:id` | Detalle del producto |
| `/cart` | Carrito |
| `/contacto` | Formulario de contacto |

## Deploy

### Vercel

1. Entrar a https://vercel.com e iniciar sesion con GitHub.
2. **Add New → Project** e importar este repo.
3. Vercel detecta Vite solo (build: `npm run build`, carpeta: `dist`). Tocar **Deploy**.

El archivo `vercel.json` hace que todas las rutas (`/cart`, `/product/1`...) carguen la app,
asi no da error 404 al recargar la pagina.

### GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica en GitHub Pages al hacer push a `main`.
En **Settings → Pages** hay que elegir **Source: GitHub Actions**.
