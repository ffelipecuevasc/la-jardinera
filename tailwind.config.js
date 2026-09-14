/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
    return ({opacityValue}) => {
        if (opacityValue !== undefined) {
            return `rgb(var(${variableName}) / ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js}",
        "./*.html"
    ],
    theme: {
        extend: {
            colors: {
                /* ============================================================
                   1. SUPERFICIES — REACTIVAS (Light/Dark vía CSS Custom Properties)
                   Fuente de verdad: src/css/input.css (:root / .dark)
                   Ver DESIGN.md §2.2
                   ============================================================ */
                "background": withOpacity('--color-background'),
                "surface": withOpacity('--color-surface'),
                "surface-container-low": withOpacity('--color-surface-container-low'),
                "surface-container": withOpacity('--color-surface-container'),
                "surface-container-high": withOpacity('--color-surface-container-high'),

                /* ============================================================
                   2. SUPERFICIES — ESTÁTICAS
                   No requieren variante oscura: uso con opacidad reducida sobre
                   bloques de fondo fijo (Hero/CTA), o sin uso actual en el DOM.
                   Ver DESIGN.md §2.3
                   ============================================================ */
                "surface-container-highest": "#e1e3de",
                "surface-container-lowest": "#ffffff",
                "surface-dim": "#d8dbd5",
                "surface-variant": "#e1e3de",
                "surface-bright": "#f8faf4",
                "surface-tint": "#316944",
                "inverse-surface": "#2e312e",
                "inverse-on-surface": "#eff1ec",

                /* ============================================================
                   3. TEXTO Y CONTORNOS — REACTIVOS
                   ============================================================ */
                "on-surface": withOpacity('--color-on-surface'),
                "on-surface-variant": withOpacity('--color-on-surface-variant'),
                "on-background": withOpacity('--color-on-background'),

                /* ============================================================
                   4. TEXTO Y CONTORNOS — ESTÁTICOS
                   outline-variant se usa siempre con opacidad (/20, /30): la
                   transparencia ya resuelve el contraste en ambos temas.
                   ============================================================ */
                "outline": "#717971",
                "outline-variant": "#c0c9bf",

                /* ============================================================
                   5. MARCA — PRIMARY (REACTIVO)
                   "primary" = texto/ícono de acento sobre superficies reactivas
                   (nav, títulos de sección, footer). Se aclara en dark mode para
                   cumplir contraste AA. Ver DESIGN.md §2.2 y §2.4.
                   ============================================================ */
                "primary": withOpacity('--color-primary'),
                "on-primary-container": withOpacity('--color-on-primary-container'),

                /* ============================================================
                   6. MARCA — PRIMARY (ESTÁTICOS)
                   "primary-brand" (NUEVO) congela el verde original (#316944)
                   para elementos de marca que deben verse IGUAL en ambos temas:
                   botón CTA del Hero y degradado del banner de newsletter, ambos
                   combinados con texto blanco fijo (text-neutral-50). Si esos
                   usos apuntaran al "primary" reactivo, el texto quedaría
                   ilegible en dark mode. Ver DESIGN.md §2.4.
                   ============================================================ */
                "primary-brand": "#316944",
                "on-primary": "#1F2421",
                "primary-container": "#8cc79a",
                "primary-fixed": "#b4f1c1",
                "primary-fixed-dim": "#99d4a6",
                "on-primary-fixed-variant": "#17512e",
                "on-primary-fixed": "#00210d",
                "inverse-primary": "#99d4a6",

                /* ============================================================
                   7. MARCA — SECONDARY (ESTÁTICOS)
                   Autosuficientes en contraste: siempre se combinan con su
                   "on-*" correspondiente sobre un relleno propio (botones/chips).
                   ============================================================ */
                "secondary": "#805256",
                "on-secondary": "#ffffff",
                "secondary-container": "#ffc2c6",
                "on-secondary-container": "#7b4d51",
                "secondary-light": "#F8D4D8",
                "secondary-hover": "#E89DA5",
                "secondary-fixed": "#ffdadb",
                "secondary-fixed-dim": "#f3b7bb",
                "on-secondary-fixed": "#321115",
                "on-secondary-fixed-variant": "#653b3f",

                /* ============================================================
                   8. MARCA — TERTIARY (ESTÁTICOS — sin uso actual en el DOM)
                   Ver DESIGN.md §5 (Notas de Auditoría)
                   ============================================================ */
                "tertiary": "#8d4a57",
                "tertiary-container": "#f6a3b1",
                "tertiary-fixed": "#ffd9de",
                "tertiary-fixed-dim": "#ffb2be",
                "on-tertiary": "#ffffff",
                "on-tertiary-container": "#743643",
                "on-tertiary-fixed": "#3a0816",
                "on-tertiary-fixed-variant": "#703340",

                /* ============================================================
                   9. ESTADOS Y SEMÁNTICA (ESTÁTICOS — convención estándar de UI)
                   ============================================================ */
                "error": "#D96A6A",
                "on-error": "#ffffff",
                "error-container": "#ffdad6",
                "on-error-container": "#93000a",
                "warning": "#E7B857",
                "success": "#6FBF73",
                "info": "#73A8D8",

                /* ============================================================
                   10. NEUTRALES (ESTÁTICOS)
                   Uso puntual sobre bloques de color/foto que ya son fijos
                   en ambos temas (Hero, CTA de newsletter).
                   ============================================================ */
                "neutral-50": "#F8F7F3",
                "neutral-100": "#F1EEE8",
                "neutral-300": "#D9DDD8",
                "neutral-500": "#676A70",
                "neutral-900": "#35363A",

                /* ============================================================
                   11. CONTRASTE FIJO — HERO / BLOQUES FOTOGRÁFICOS
                   NO reactivos al theme. No confundir con el sistema de dark
                   mode del sitio. Ver DESIGN.md §3.
                   ============================================================ */
                "dark-background": "#1F2421",
                "dark-on-background": "#F3F3F0",
                "dark-surface-container-low": "#2B302D",
                "dark-surface-variant": "#5A615D",
                "dark-neutral-50": "#BFC5BE",
                "dark-neutral-100": "#8A918B",
                "dark-neutral-300": "#5A615D",
                "dark-on-surface-variant": "#BFC5BE",
            },
            borderRadius: {
                "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"
            },
            spacing: {
                "space-1": "0.5rem",
                "space-10": "5rem",
                "space-8": "4rem",
                "gutter": "1.5rem",
                "margin-mobile": "1.25rem",
                "container-max": "80rem",
                "space-6": "3rem",
                "section-gap": "7.5rem",
                "space-5": "2.5rem",
                "space-unit": "0.5rem",
                "space-2": "1rem",
                "margin-desktop": "2.5rem",
                "space-3": "1.5rem",
                "space-4": "2rem"
            },
            fontFamily: {
                "label-md": ["Montserrat", "sans-serif"],
                "headline-lg": ["Noto Serif", "serif"],
                "display-hero-mobile": ["Noto Serif", "serif"],
                "body-xs": ["Montserrat", "sans-serif"],
                "body-sm": ["Montserrat", "sans-serif"],
                "label-lg": ["Montserrat", "sans-serif"],
                "headline-sm": ["Noto Serif", "serif"],
                "display-hero": ["Noto Serif", "serif"],
                "headline-md": ["Noto Serif", "serif"],
                "body-md": ["Montserrat", "sans-serif"],
                "label-sm": ["Montserrat", "sans-serif"],
                "headline-xl-mobile": ["Noto Serif", "serif"],
                "body-lg": ["Montserrat", "sans-serif"],
                "headline-xl": ["Noto Serif", "serif"]
            },
            fontSize: {
                "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "600"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "400"}],
                "display-hero-mobile": ["40px", {
                    "lineHeight": "48px",
                    "letterSpacing": "-0.01em",
                    "fontWeight": "400"
                }],
                "body-xs": ["12px", {"lineHeight": "16px", "fontWeight": "400"}],
                "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.06em", "fontWeight": "600"}],
                "headline-sm": ["18px", {"lineHeight": "26px", "fontWeight": "400"}],
                "display-hero": ["64px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "400"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "400"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "label-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                "headline-xl-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "400"}],
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "headline-xl": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.015em", "fontWeight": "400"}]
            }
        }
    },
    plugins: [],
}