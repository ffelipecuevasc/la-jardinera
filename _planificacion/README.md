# Constitución Operativa — `_planificacion/`

> Carpeta de planificación y gobernanza del sitio de **La Jardinera Florería** (Valdivia, Chile).
> Antes se llamaba `_antigravity/`. Se renombró en la Épica 07 porque el proyecto ahora trabaja con más de un agente
> de IA (Antigravity y Claude Code) bajo las mismas reglas.
>
> **Esta carpeta no se publica en producción.** El comando de compilación de Cloudflare Pages la excluye.

---

## 1. Propósito

`_planificacion/` es la memoria del proyecto: qué se quiere construir (visión), con qué reglas (arquitectura), en qué
orden (épicas e iteraciones) y qué se hizo realmente (bitácoras). Permite que cualquier agente o persona retome el
trabajo sin depender del historial de una conversación.

Principio rector: **ningún cambio de código sin una iteración que lo especifique, y ninguna iteración cerrada sin una
bitácora que lo demuestre.**

---

## 2. Roles y jerarquía de documentos

### 2.1 Roles

| Rol             | Responsabilidades                                                                                  |
|:----------------|:---------------------------------------------------------------------------------------------------|
| Desarrollador   | Aprueba épicas e iteraciones, edita `AGENTS.md`, `README.md` y `DESIGN.md`, hace *commits*, *push*, *merge* y gestiona Cloudflare. |
| Agente de IA    | Redacta especificaciones cuando se le piden, ejecuta iteraciones aprobadas, verifica, escribe bitácoras y propone cambios a los archivos protegidos. |

Agentes habilitados: **Claude Code** (lee `AGENTS.md` de forma nativa) y **Antigravity** (debe configurarse para leer
`AGENTS.md` y este archivo como reglas del espacio de trabajo).

### 2.2 Orden de precedencia

Cuando dos fuentes se contradicen, prevalece la de mayor rango. Si el conflicto afecta el resultado, el agente se
detiene y lo reporta en vez de resolverlo por su cuenta.

1. Instrucción explícita del desarrollador en el chat.
2. `AGENTS.md` (raíz).
3. `DESIGN.md` (raíz) para todo lo visual.
4. `02-arquitectura/stack-tecnologico.md` para todo lo técnico.
5. Especificación de la iteración en curso.
6. Este documento.

---

## 3. Estructura de la carpeta

```text
_planificacion/
├── README.md                          # Esta constitución operativa
├── 01-vision/
│   ├── proposito-y-alcance.md         # Identidad, páginas y límites del producto
│   └── objetivos-y-metricas.md        # Métricas de calidad (Lighthouse, CLS, FCP)
├── 02-arquitectura/
│   ├── stack-tecnologico.md           # Reglas de arquitectura y del stack
│   └── DESIGN.md                      # Redirección: la fuente única vive en /DESIGN.md
├── 03-planificacion/
│   └── epicas/
│       └── epica-NN-slug/
│           ├── definicion-epica.md    # Objetivo, alcance, plan de iteraciones y DoD de la épica
│           └── iteracion-NN.md        # Especificación ejecutable de cada iteración
└── 04-bitacora/
    ├── estado-actual.md               # Una línea por iteración, en orden cronológico
    ├── decisiones-tecnicas.md         # Decisiones de arquitectura y excepciones aprobadas
    └── bitacora-epica-NN/
        └── bitacora-iteracion-NN.md   # Evidencia de ejecución de cada iteración
```

`01-vision/` y `02-arquitectura/` solo se editan con autorización explícita del desarrollador.

---

## 4. Protocolo de inicio (obligatorio para todo agente)

1. **Leer** `README.md`, `DESIGN.md`, este documento y `04-bitacora/estado-actual.md`.
2. **Ubicarse:** identificar la épica y la iteración vigentes y su estado.
3. **Leer la especificación** de la iteración asignada y los archivos que menciona.
4. **Plan de impacto** explícito: archivos a tocar, efecto en el DOM y en la compilación de Tailwind, invariantes en
   riesgo y verificación prevista.
5. **Esperar aprobación** del plan, salvo que el desarrollador haya indicado proceder directamente.

---

## 5. Ciclo de vida de una iteración

| Estado                                  | Quién lo declara | Condición                                                        |
|:----------------------------------------|:-----------------|:-----------------------------------------------------------------|
| ⏳ Planificada                          | Desarrollador    | Existe `iteracion-NN.md` aprobado.                               |
| 🔧 En ejecución                         | Agente           | Plan de impacto aprobado.                                        |
| 🕒 Ejecutada, pendiente de certificación | Agente           | Código listo, pero falta evidencia de render real o de compilación. |
| ✅ Certificada                           | Agente           | Todos los criterios con evidencia verificable.                   |
| 🔒 Cerrada                              | Desarrollador    | Cambios revisados y fusionados en `main`.                        |

Una épica se cierra solo cuando todas sus iteraciones están cerradas y su DoD está verificado.

---

## 6. Reglas de acero (resumen)

El detalle vive en `AGENTS.md` §5; aquí se listan para consulta rápida:

1. MPA estricta de 6 archivos HTML. Sin emulación de SPA.
2. Cero JS y CSS en línea (`style=`, `onclick`, `<script>` con lógica).
3. JavaScript en módulos ES6 registrados en `src/js/main.js`, con cláusulas de guarda.
4. Solo tokens de `DESIGN.md` y `tailwind.config.js`; clases de Tailwind siempre literales.
5. Header y footer duplicados en los 6 HTML: paridad exacta, `index.html` como fuente de la verdad.
6. Una iteración, un alcance: no se tocan archivos fuera de lo especificado.
7. Git en modo lectura para los agentes; *commits*, *push* y *merge* los hace el desarrollador.

---

## 7. Estándar de verificación

1. **Compilación:** `pnpm build` sin errores y clases nuevas presentes en `dist/css/output.css`.
2. **Invariantes por búsqueda de texto:** `style=`, `onclick`, `href="#"`, IDs únicos, ausencia de `fixed` dentro del
   `<header>`.
3. **Render real** en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro,
   cuando la iteración tiene impacto visual. La Iteración 06 de la Épica 06 demostró que inspeccionar el marcado no
   basta.
4. **Consola** del navegador sin errores.
5. **Sin evidencia no hay ✅.** Lo no verificado se registra como `🕒 PENDIENTE`, con la lista de comprobaciones
   manuales para el desarrollador. Nunca se inventan métricas ni hashes.

---

## 8. Bitácoras

### 8.1 Línea de `estado-actual.md`

Se añade **una** línea al final, sin reescribir las anteriores:

```text
Épica NN - Iteración NN: <Título de la iteración> - <Completada con éxito | Completada con reservas (motivo) | Ejecutada; PENDIENTE de certificación (qué falta)>.
```

### 8.2 Plantilla de bitácora

```markdown
# Bitácora de Ejecución - Épica NN - Iteración NN

**Fecha de ejecución:** DD-MM-AAAA
**Agente:** Claude Code | Antigravity
**Objetivo:** (una frase)

## 1. Resumen ejecutivo
## 2. Línea base (estado previo y defecto reproducido, si aplica)
## 3. Cambios realizados (por archivo)
## 4. Verificación de criterios de aceptación
| Criterio | Estado | Evidencia (código / render real) |
## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance
## 6. Archivos modificados y propuestas para archivos protegidos
## 7. Mensaje de commit sugerido
```

---

## 9. Plantilla de especificación de iteración

```markdown
# Iteración NN: <Título>

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
(Contexto, fuente de la verdad, archivos permitidos y prohibidos.)

## 1. Objetivo de la Iteración
## 2. Tareas Técnicas (Ejecución Estricta)
## 3. Auditoría de No-Regresión e Invariantes
## 4. Criterios de Aceptación (Definition of Done)
* **Escenario N: <Nombre>**
    * **Dado** ...
    * **Cuando** ...
    * **Entonces** ...
```

---

## 10. Política de control de versiones

| Acción                                                        | Agente | Desarrollador |
|:--------------------------------------------------------------|:------:|:-------------:|
| `git status`, `diff`, `log`, `show`, `blame`, `ls-files`      | ✅     | ✅            |
| `git add`, `commit`, `push`, `pull`, `merge`, `rebase`, `reset` | ❌     | ✅            |
| `git mv`, `git rm`, cambios de rama, `stash`, `tag`           | ❌ (solo propone) | ✅ |
| Despliegues y configuración de Cloudflare                     | ❌     | ✅            |

Además de esta regla escrita, `.claude/settings.json` bloquea estos comandos a nivel de permisos en Claude Code.

---

## 11. Convenciones de nombres

| Elemento              | Formato                                   | Ejemplo                                   |
|:----------------------|:------------------------------------------|:------------------------------------------|
| Carpeta de épica      | `epica-NN-slug-en-minusculas`             | `epica-08-componentes-react`              |
| Especificación        | `iteracion-NN.md`                         | `iteracion-03.md`                         |
| Carpeta de bitácoras  | `bitacora-epica-NN`                       | `bitacora-epica-08`                       |
| Bitácora              | `bitacora-iteracion-NN.md`                | `bitacora-iteracion-03.md`                |
| Iteración no planificada | Siguiente número libre, marcada como "extensión no planificada" | Épica 06 · Iteración 13 |

Los números siempre con dos dígitos.

---

## 12. Registro de deuda técnica abierta

| ID    | Descripción                                                                                                  | Severidad | Se resuelve en      |
|:------|:-------------------------------------------------------------------------------------------------------------|:----------|:--------------------|
| DT-01 | `servicios.html`, footer columna 1: falta la apertura `<a` del enlace de marca; el navegador muestra el texto `class="..." ... >La Jardinera` en pantalla. | Alta | Épica 07 · It. 03 |
| DT-02 | Hallazgo H8 (barra de escritorio entre 1024 y 1099 px) corregido en la Iteración 13 sin certificación en render real. | Media | Épica 07 · It. 03 |
| DT-03 | `style=` heredados: textura de ruido del banner (Inicio, Servicios, Suscripción, Galería) y fondo del Hero del Inicio. | Media | Épica 07 · It. 03 |
| DT-04 | `index.html` no declara `<meta name="description">`.                                                          | Media     | Épica 07 · It. 04   |
| DT-05 | `404.html`: botones sociales del footer con `hidden lg:flex`, invisibles en móvil (el resto de páginas los muestra). | Baja | Épica 07 · It. 03 |
| DT-06 | Footer con dos variantes de contenedor y enlace activo sin `font-body-sm text-body-sm`.                       | Baja      | Épica 08 (componente único) |
| DT-07 | Texto "Redbank" en la franja de beneficios del Inicio; en Chile la red se llama **Redbanc**.                  | Baja      | Épica 07 · It. 03   |
| DT-08 | Sin `robots.txt`, `sitemap.xml`, `canonical` ni etiquetas Open Graph.                                         | Media     | Épica 07 · It. 04   |
| DT-09 | ✅ **Resuelta** (Épica 07 · Iteración 01). `01-vision/proposito-y-alcance.md` y `02-arquitectura/stack-tecnologico.md` desactualizados (5 páginas, Netlify Forms, GitHub Actions como despliegue). | Baja | Épica 07 · It. 01 |
| DT-10 | `src/js/main.js` importa módulos con ruta variable (`import(path)`): funciona en el navegador, pero impide el análisis de un empaquetador. | Baja (bloqueante para Épica 08) | Épica 08 · It. 02 |
| DT-11 | Varios archivos guardados con BOM UTF-8 (`index.html`, `input.css`, `main.js`, módulos JS, `tailwind.config.js`). | Baja | Oportunista |
| DT-12 | Deuda de diseño listada en `DESIGN.md` §5.                                                                    | Baja      | Según iteración     |

---

## 13. Historial de esta carpeta

| Fecha       | Cambio                                                                                                  |
|:------------|:--------------------------------------------------------------------------------------------------------|
| 2026        | Creación como `_antigravity/` para gobernar al agente Antigravity (Épicas 01 a 06).                     |
| Épica 07    | Renombrada a `_planificacion/`; constitución reescrita para operar con varios agentes; `DESIGN.md` trasladado a la raíz del repositorio. |

Las bitácoras de las Épicas 01 a 06 conservan las rutas `_antigravity/...` que usaban al momento de escribirse: son
registro histórico y no se editan.