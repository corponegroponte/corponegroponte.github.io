# Corporación Nicholas Negroponte — sitio web

Sitio institucional de la Corporación Nicholas Negroponte (investigación, innovación y
transición energética). SPA estática construida con **React 19 + Vite 7 + Tailwind CSS 4**
y publicada en **GitHub Pages**.

- **URL de producción:** https://corponegroponte.org/
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

### Dominio propio

El sitio se sirve en `https://corponegroponte.org/`. El dominio se compró en Cloudflare
Registrar y se apunta a GitHub Pages con estos registros DNS (proxy desactivado):

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   corponegroponte.github.io
```

`client/public/CNAME` contiene el dominio y el build lo copia a `dist/public`, así el
deploy no borra la configuración de Pages. `vite.config.ts` mantiene `base: "/"`.

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
