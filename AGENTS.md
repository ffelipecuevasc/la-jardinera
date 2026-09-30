# AGENTS.md — Instrucciones para agentes de IA

> **Proyecto:** sitio web de **La Jardinera Florería** (Valdivia, Región de Los Ríos, Chile)
> **Producción:** https://www.lajardinerafloreria.cl
> **Mantenedor y único editor de este archivo:** Felipe Cuevas (desarrollador del proyecto).
>
> Claude Code (v2.1.277 o superior) lee este archivo automáticamente **solo si en el proyecto no existe `CLAUDE.md`,
> `.claude/CLAUDE.md` ni `CLAUDE.local.md`**. No crees ninguno de esos archivos: desactivarían la lectura de este.
> Otros agentes compatibles con el estándar AGENTS.md (Antigravity, Codex, Cursor, etc.) deben seguir estas mismas reglas.

---

## 0. Idioma y tono

1. Responde **siempre en español de Chile**, con tuteo y registro profesional (sin voseo ni modismos coloquiales).
2. Todo contenido visible del sitio, comentarios de código, bitácoras y mensajes de commit sugeridos se escriben en
   español de Chile.
3. Formatos locales: moneda `$15.000` (punto de miles, sin decimales), fechas `DD-MM-AAAA` en textos visibles,
   teléfonos `+56 9 XXXX XXXX`.

---

## 1. Lectura obligatoria antes de cualquier acción

Antes de proponer o modificar cualquier cosa, lee **en este orden** y confirma en tu primera respuesta que lo hiciste:

1. `README.md` — visión general, stack, despliegue y convenciones.
2. `DESIGN.md` — **única fuente de la verdad** para tokens, componentes, efectos y accesibilidad visual.
3. `_planificacion/README.md` — constitución operativa, ciclo de vida de épicas e iteraciones, plantillas.
4. `_planificacion/04-bitacora/estado-actual.md` — dónde está el proyecto hoy.
5. La especificación de la iteración asignada en `_planificacion/03-planificacion/epicas/<épica>/iteracion-NN.md`.
6. `_planificacion/02-arquitectura/stack-tecnologico.md` — reglas de arquitectura.

Si alguno de estos documentos se contradice con otro, **detente y reporta el conflicto**; no elijas por tu cuenta.

---

## 2. Archivos protegidos

| Archivo o ruta                                         | Regla                                                          |
|:-------------------------------------------------------|:---------------------------------------------------------------|
| `AGENTS.md`, `README.md`, `DESIGN.md`                   | **Solo lectura, sin excepción.** Puedes proponer cambios, nunca aplicarlos. |
| `CLAUDE.md`, `CLAUDE.local.md`, `.claude/**`            | Prohibido crearlos o editarlos.                                |
| `_planificacion/01-vision/**`, `_planificacion/02-arquitectura/**` | Solo con autorización explícita del desarrollador en el chat. |
| `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`  | Solo con autorización explícita del desarrollador en el chat. |
| Bitácoras de iteraciones ya cerradas                   | Registro histórico: no se reescriben.                          |

### Protocolo para proponer cambios a un archivo protegido

Cuando una tarea requiera modificar un archivo protegido, entrega al final de tu respuesta un bloque con este formato
y continúa con el resto del trabajo que sí puedes hacer:

````markdown
### Propuesta de edición — `DESIGN.md`
**Sección:** §9.2 Panel móvil
**Motivo:** (por qué el cambio es necesario, en una o dos frases)
```diff
- línea actual
+ línea propuesta
```
````

---

## 3. Control de versiones y despliegue

El control de versiones y la publicación son responsabilidad exclusiva del desarrollador.

1. **Prohibido** ejecutar cualquier comando Git que modifique el repositorio o su historial: `git add`, `commit`,
   `push`, `pull`, `merge`, `rebase`, `reset`, `revert`, `checkout`, `switch`, `branch -d/-D`, `stash`, `tag`,
   `cherry-pick`, `clean`, `mv`, `rm`, y equivalentes de `gh` (`gh pr create`, `gh pr merge`, etc.).
2. **Permitido** usar Git en modo lectura para diagnosticar: `git status`, `git diff`, `git log`, `git show`,
   `git blame`, `git ls-files`.
3. Para mover o renombrar archivos versionados, **propón** el comando `git mv` correspondiente; no lo ejecutes.
4. **Prohibido** desplegar: nada de `wrangler`, ni cambios en el panel de Cloudflare. El sitio se publica solo, desde
   la rama `main`, mediante Cloudflare Pages.
5. Al cerrar una tarea, sugiere un mensaje de commit en formato *Conventional Commits* y en español:
   `feat(hero): reemplaza el destacador del H1 por el efecto Starlight`.

---

## 4. Stack y comandos

| Capa            | Tecnología                                                        |
|:----------------|:------------------------------------------------------------------|
| Estructura      | HTML5 semántico, sitio multipágina (MPA) de 6 archivos             |
| Estilos         | Tailwind CSS `3.4.x` compilado por CLI a `dist/css/output.css`     |
| Interactividad  | JavaScript Vanilla ES6+ en módulos (`src/js/`)                     |
| Paquetes        | **pnpm `11.24.0`** (Node.js `>= 22.13`). Prohibido `npm` o `yarn`. |
| Hosting         | GitHub + Cloudflare Pages, dominio `lajardinerafloreria.cl`        |

| Comando       | Uso                                                                  |
|:--------------|:---------------------------------------------------------------------|
| `pnpm install`| Instala dependencias (solo si el desarrollador lo pide).             |
| `pnpm dev`    | Tailwind en modo observación.                                        |
| `pnpm run build:cf` | Compila el CSS y genera `_site/` por lista blanca para Cloudflare Pages. | 

Notas:

- El aviso `Browserslist: caniuse-lite is outdated` es conocido. **No** ejecutes `npx update-browserslist-db`.
- Los módulos ES no funcionan con `file://`. Para probar en navegador, sirve la raíz por HTTP (por ejemplo, la
  extensión Live Server o `python -m http.server 5500`).
- **React no forma parte del stack actual.** Su incorporación está planificada en la Épica 08 y no debe adelantarse.

---

## 5. Reglas de arquitectura (no negociables)

1. **MPA estricta.** Seis archivos HTML físicos: `index.html`, `servicios.html`, `suscripcion-floral.html`,
   `galeria.html`, `contacto.html` y `404.html`. Prohibido emular una SPA.
2. **Cero JS y CSS en línea.** Prohibidos `style="..."`, `onclick` y `<script>` con lógica. Los únicos `style=`
   existentes son deuda técnica registrada (ver `_planificacion/README.md` §12); no agregues nuevos.
3. **Módulos ES6.** Toda la lógica vive en `src/js/modules/*.js`, se registra en `src/js/main.js` y exporta una
   función `initX()` con cláusula de guarda (`if (!elemento) return;`). Selectores en caché, delegación de eventos,
   nada en `window`, módulos desacoplados.
4. **Solo tokens de `DESIGN.md` y `tailwind.config.js`.** Prohibido inventar colores, tamaños o clases. Los tonos
   `neutral-*` por defecto de Tailwind que no están declarados en el proyecto no deben usarse en código nuevo.
5. **Clases de Tailwind siempre literales.** Tailwind no detecta clases armadas con plantillas (`` `sm:grid-cols-${n}` ``).
   Si una clase se construye dinámicamente, debe existir escrita en forma literal en algún archivo del `content`.
6. **Header y footer están duplicados en los 6 HTML.** Todo cambio en ellos se replica en los 6 archivos con paridad
   exacta, usando `index.html` como fuente de la verdad. Solo difiere el enlace activo; `404.html` no tiene ninguno.
7. **Invariantes del header** (causa raíz de defectos anteriores):
    - Ningún descendiente de `<header>` lleva la clase `fixed`.
    - `#mobile-menu-scrim` es el nodo hermano inmediatamente posterior a `</header>`.
    - La barra mide `h-20`; el panel (`top-full`, `max-h-[calc(100dvh-5rem)]`) y la capa tenue (`top-20`) dependen de
      ese valor. Si uno cambia, cambian todos.
8. **Rutas relativas** con `./` para todo recurso y enlace interno.
9. **Imágenes** en `.webp` bajo `public/images/`, con `width`, `height`, `alt` descriptivo y `loading="lazy"` bajo el
   pliegue. Contenedores con `aspect-*` para CLS = 0.
10. **Accesibilidad:** objetivos táctiles de 44 × 44 px, foco visible, `aria-*` sincronizados, trampas de foco en
    modales, contraste WCAG 2.1 AA verificado en modo claro **y** oscuro.

---

## 6. Flujo de trabajo por tarea

1. **Lectura** (§1).
2. **Plan de impacto** antes de editar: archivos a tocar, efecto en el DOM, clases nuevas para Tailwind, riesgos e
   invariantes afectados. Espera la aprobación del desarrollador salvo que ya te haya indicado proceder.
3. **Implementación quirúrgica**, limitada al alcance de la iteración.
4. **Verificación** (§7).
5. **Registro:** crea `_planificacion/04-bitacora/bitacora-epica-NN/bitacora-iteracion-NN.md` y añade una línea al
   final de `_planificacion/04-bitacora/estado-actual.md`. Las decisiones técnicas relevantes van a
   `_planificacion/04-bitacora/decisiones-tecnicas.md`.
6. **Reporte final:** qué cambió, qué quedó pendiente, propuestas para archivos protegidos y mensaje de commit sugerido.

---

## 7. Verificación mínima (Definition of Done global)

- `pnpm build` termina sin errores y `dist/css/output.css` contiene las clases nuevas (búscalas por texto).
- Búsquedas de invariantes: 0 `style="` nuevos, 0 `onclick`, 0 `href="#"` en navegación y footer, IDs únicos.
- Paridad entre los 6 HTML cuando se toca header o footer.
- Render real en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro,
  cuando hay cambios visuales. Si no dispones de un navegador automatizable, **no lo inventes**: deja el ítem como
  `🕒 PENDIENTE` con la lista de comprobaciones manuales.
- Consola del navegador sin errores.

---

## 8. Honestidad en los reportes

1. Nunca marques un criterio como `✅` sin evidencia. Distingue siempre entre **"confirmado por código"** y
   **"confirmado en render real"**.
2. No inventes métricas, hashes, tiempos de compilación ni resultados de pruebas.
3. Si detectas un defecto fuera del alcance de tu iteración, **repórtalo** en la bitácora; no lo corrijas.

---

## 9. Contexto de despliegue (solo informativo)

- Cloudflare Pages construye y publica automáticamente cada push a `main`; las demás ramas generan despliegues de vista
  previa.
- La carpeta `_planificacion/` y la documentación interna **no deben publicarse**: Cloudflare Pages publica solo
  `_site/`, que `pnpm run build:cf` genera por lista blanca (6 HTML, `dist/`, `public/` y `src/js/`).
- Cloudflare Web Analytics y Google Search Console se gestionan fuera del código: **no** agregues scripts de
  analítica ni etiquetas de verificación sin autorización.