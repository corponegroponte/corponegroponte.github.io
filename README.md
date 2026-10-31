# Corporación Nicholas Negroponte — sitio web

Sitio institucional de la Corporación Nicholas Negroponte (investigación, innovación y
transición energética). SPA estática construida con **React 19 + Vite 7 + Tailwind CSS 4**
y publicada en **GitHub Pages**.

- **URL de producción:** https://corponegroponte.github.io/
- **Repositorio:** https://github.com/corponegroponte/corponegroponte.github.io

## Desarrollo local

Requiere Node 20.19+ o 22.12+ y pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Comando            | Qué hace                                                        |
| ------------------ | --------------------------------------------------------------- |
| `pnpm dev`         | Servidor de desarrollo con HMR.                                 |
| `pnpm check`       | Verificación de tipos con `tsc --noEmit`.                       |
| `pnpm build:client`| Build estático del cliente en `dist/public` (lo que usa Pages). |
| `pnpm preview`     | Sirve el build localmente para revisarlo.                       |
| `pnpm build`       | Build del cliente **y** del servidor Express (`server/index.ts`).|
| `pnpm start`       | Levanta el servidor Express sobre `dist/` (uso alternativo).    |

## Despliegue

GitHub Pages sirve la rama **`gh-pages`** (no hay workflow de Actions: el token de
`gh` de esta máquina no tiene el scope `workflow`). Para publicar cambios:

```bash
bash scripts/deploy-gh-pages.sh
```

El script construye `dist/public`, lo copia a una rama huérfana `gh-pages` y la
empuja con `--force` al remoto `origin`. GitHub Pages la publica en unos segundos.

Si en algún momento quieres automatizarlo con Actions, hay que autorizar el scope
(`gh auth refresh -h github.com -s workflow`) y cambiar en *Settings → Pages* la
fuente a "GitHub Actions", añadiendo un workflow que suba `dist/public`.

### Base path y dominio propio

`vite.config.ts` fija `base` en `/` porque el repositorio se llama
`corponegroponte.github.io` y GitHub Pages lo sirve como sitio de organización en la
raíz. Si algún día se conecta el dominio `corponegroponte.com`, no hay que cambiar el
base:

```bash
pnpm build:client
```

y añadir el archivo `CNAME` con `corponegroponte.com` dentro de `client/public/`.
Ojo: ese dominio hoy lo sirve otro repositorio (`riverosmejia/corpo-web`); conectar
este repo implica liberarlo antes en el otro.

## Estructura

```
client/
  index.html            # shell HTML (título, metas, favicon)
  public/               # estáticos que se copian tal cual (favicon, .nojekyll)
  src/
    App.tsx             # rutas de wouter con base path de Pages
    assets/             # imágenes de marca empaquetadas por Vite
    pages/Home.tsx      # la página completa (secciones, formulario, nav)
    components/ui/      # componentes shadcn/ui
server/index.ts         # servidor Express opcional para servir el build
.github/workflows/      # despliegue a GitHub Pages
```

## Notas de mantenimiento

- Las imágenes de marca viven en `client/src/assets/` y se importan desde
  `Home.tsx`. Vite les pone hash y las sirve bajo el `base` configurado.
- El proyecto ya **no depende de Manus**: se retiraron el runtime inline que
  inyectaba ~367 KB en cada build, el plugin `jsx-loc` (añadía atributos
  `data-loc` en producción) y el colector de logs de desarrollo.
- Las anclas del menú (`#quienes-somos`, `#proyectos`, `#parque-solar`,
  `#contacto`) son navegación por hash dentro de una sola página.
- `dist/public/404.html` se genera en cada build copiando `index.html`, para que
  cualquier ruta desconocida cargue la app en vez del 404 de GitHub.
