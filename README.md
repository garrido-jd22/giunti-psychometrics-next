# Giunti Psychometrics

Catálogo web de test psicométricos y cursos de formación. Está construido con **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4** y **lucide-react**.

La interfaz está en italiano.

---

## Requisitos

- **Node.js 20.9** o superior.
- **npm** (incluido con Node).
- **Git**.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd giunti-psychometrics-next
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

### Despliegue continuo con Vercel

El proyecto está conectado a Vercel a través del repositorio de Git. No hace falta desplegar a mano:

1. Haz commit de los cambios.
2. Haz push al repositorio remoto:

   ```bash
   git add .
   git commit -m "descripción del cambio"
   git push origin main
   ```

3. Vercel detecta el push, ejecuta `npm run build` con los cambios nuevos y, si el build termina bien, publica la nueva versión automáticamente.

Si el build falla, Vercel no publica nada y la versión anterior sigue en línea.

## Comandos

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000), con recarga en caliente. |
| `npm run build` | Genera el build optimizado para producción. Es el mismo comando que ejecuta Vercel. |
| `npm run start` | Sirve en local el build de producción. Ejecuta antes `npm run build`. |
| `npm run lint` | Revisa el código con ESLint. |

Para comprobar el build de producción en local:

```bash
npm run build
npm run start
```

---

## Versiones

### v0.1.0

#### Estructura modular

Cada tipo de archivo vive en su propia carpeta. Así un componente no mezcla tipos, datos ni lógica de estado, y es fácil encontrar cada pieza.

```text
├── app/                      Rutas, layouts y páginas (App Router)
│   ├── layout.tsx            Layout raíz: fuente, tema y toasts
│   └── (home)/               Grupo de rutas con header, footer y carrito
│       ├── layout.tsx
│       ├── page.tsx          Home
│       └── products/
│           ├── (catalog)/    Catálogo con pestañas Test / Formazione
│           │   ├── layout.tsx
│           │   └── page.tsx
│           └── [slug]/       Detalle dinámico de cada producto
│               ├── page.tsx
│               └── not-found.tsx
├── components/               Componentes reutilizables en todo el proyecto
│   ├── ui/                   Piezas genéricas: select, toast, form-field, theme-toggle
│   ├── layout/               Header, menú mobile, buscador y footer
│   ├── product/              Card, grid, filtros y skeleton de producto
│   └── cart/                 Botón, panel lateral y línea del carrito
├── features/                 Componentes propios de una sección
│   ├── home/components/      Hero, productos destacados, contacto
│   └── products/components/  Catálogo, pestañas y detalle
├── hooks/                    Custom hooks con la lógica de estado
├── lib/
│   ├── services/             Servicios: *.service.ts
│   ├── data/                 Datos de ejemplo (se sustituirán por una API)
│   ├── validation/           Validaciones de formularios
│   └── products.ts           Funciones puras: formato, filtrado y URLs
├── config/                   Constantes y opciones: navegación, filtros, tiempos
├── interfaces/               Interfaces: *.interface.ts
├── types/                    Tipos y uniones: *.types.ts
└── public/                   Fuentes, imágenes y video
```

| Carpeta | Contiene | Ejemplo |
|---|---|---|
| `config/` | Constantes y valores por defecto | `SEARCH_DEBOUNCE_MS`, `PRODUCT_TABS` |
| `interfaces/` | Forma de los objetos | `Product`, `CartItem` |
| `types/` | Uniones y alias | `ProductType = "test" \| "course"` |
| `lib/services/` | Estado global, efectos secundarios y acceso a datos | `cart.service.ts`, `theme.service.ts` |
| `lib/data/` | Datos de ejemplo tipados | `PRODUCTS` |
| `hooks/` | Lógica de estado reutilizable | `useProductFilters`, `useCart` |
| `components/` | UI compartida | `ProductCard`, `Select` |
| `features/` | UI de una sola sección | `Hero`, `ProductDetail` |

#### Layouts y rutas

- **Grupos de rutas:**
  - `(home)` comparte header, footer y carrito sin añadir nada a la URL.
  - `(catalog)` aplica el título y las pestañas solo al listado. La página de detalle no las hereda.
- **Pestañas en el layout:**
  - **Test** apunta a `/products?type=test` y **Formazione** a `/products?type=course`.
  - Al cambiar de pestaña solo se vuelve a renderizar el contenido de la página. El título y las pestañas se mantienen.
  - Cada pestaña es un enlace, así que se puede compartir y funcionan los botones atrás y adelante del navegador.
- **Rutas dinámicas:**
  - `/products/[slug]` muestra el detalle de cada producto, por ejemplo `/products/scala-umore`.
  - Con `generateStaticParams` todas las páginas de detalle se generan en el build.
  - Si el slug no existe, se muestra una página propia de "producto no encontrado".

#### Server Components y Client Components

- **Por defecto todo es Server Component:** páginas, layouts, el hero, el detalle de producto y las secciones. Se renderizan en el servidor y no envían JavaScript al navegador.
- **`"use client"` solo donde hay interacción:** filtros, buscador, select, carrito, menú mobile, formulario de contacto y cambio de tema.
- **Lectura de la URL dentro de `<Suspense>`:** la página pasa `searchParams` y `params` sin esperarlos a un componente hijo, que los lee dentro de un `<Suspense>`. La parte fija de la página se muestra al instante y se puede precargar.

#### Componentes reutilizables y dinámicos

- **Card y grid separados:**
  - `ProductCard` recibe un solo producto.
  - `ProductGrid` recibe la lista y la recorre.
  - La card no sabe nada de los filtros: el padre le pasa la lista ya filtrada.
- **Componentes genéricos:**
  - `Select<T>` funciona con cualquier lista de opciones y se usa con el teclado.
  - `FormField` agrupa etiqueta, control y mensaje de error.
  - `AddToCartButton` tiene tres variantes: `pill`, `icon` y `block`.
- **Interfaz basada en datos:**
  - Las pestañas, los filtros, la navegación y las tarjetas del hero se generan a partir de `config/` y `lib/data/`.
  - Añadir un producto o una opción no requiere tocar componentes.

#### Skeletons y búsqueda con debounce

- **Carga simulada con skeleton:** al entrar en el catálogo, al cambiar de pestaña o al buscar, se muestra un skeleton con la misma forma que el contenido real. Así se simula una consulta asíncrona y la página no salta cuando llegan los datos.
- **Debounce en el buscador:**
  - El filtro no se ejecuta en cada tecla.
  - Espera 500 ms después de la última pulsación (`SEARCH_DEBOUNCE_MS`).
  - Después muestra el skeleton y luego los resultados.
  - Así se evitan filtrados, renders y, en el futuro, peticiones a la API innecesarios.
  - Lo implementan `useDebouncedValue` y `useDebouncedSearch`.

#### Cambio de tema (claro / oscuro)

- **Botón en el header:** alterna entre tema claro y oscuro.
- **Preferencia guardada:** se guarda en `localStorage`. Si el usuario nunca eligió, se usa la del sistema operativo.
- **Sin parpadeo:** un script inline aplica el tema antes del primer pintado.
- **Sincronizado entre pestañas:** el cambio se aplica en todas las pestañas abiertas.

#### Diseño 100% responsive

Probado en tres tamaños:

| Dispositivo | Ancho | Comportamiento |
|---|---|---|
| Mobile | 375 px | Menú hamburguesa, filtros apilados, una columna y carrito a pantalla completa |
| Tablet | 768 px | Grids de 2 columnas, filtros en una fila y carrito de 420 px |
| Desktop | 1280 px o más | Navegación completa, grid de productos de 3 columnas, tarjetas del hero en 4 y detalle a dos columnas con columna de compra fija |

Las animaciones de entrada son solo CSS y animan únicamente `opacity` y `transform`. Respetan la opción "reducir movimiento" del sistema (`motion-safe:`).

#### Uso adecuado del estado

La lógica de estado está en custom hooks dentro de `hooks/`, no en los componentes:

- **`useMemo`:** la lista filtrada, los productos del carrito y el total solo se recalculan cuando cambian sus dependencias. Por ejemplo, `filterProducts` se ejecuta solo si cambian los productos o un filtro.
- **`useCallback`:** los setters de los filtros y los handlers mantienen la misma referencia entre renders. Así los hijos memoizados (`memo`) no se vuelven a renderizar sin motivo.
- **`memo`:** `ProductCard`, `CartItem`, `ProductFilters` y los resultados del buscador solo se vuelven a renderizar si cambian sus props.
- **`useEffect`:** solo para sincronizar con sistemas externos: temporizadores del debounce, clics fuera, la tecla Esc o bloquear el scroll. El estado derivado se calcula, no se guarda con `useEffect` + `setState`.
- **`useSyncExternalStore`:** carrito, toasts y tema son stores externos sin Provider. Cada componente se suscribe solo a lo que necesita, y el carrito se sincroniza entre pestañas.

#### Carrito

- **Añadir:** desde la card, desde el buscador o desde el detalle, con un toast de confirmación.
- **Panel lateral:** sale por la derecha y muestra los productos, las cantidades, el número de artículos y el total. Desde ahí se puede eliminar cada producto.
- **Persistencia:** el carrito se guarda en `localStorage`, así que sobrevive a una recarga de la página.
