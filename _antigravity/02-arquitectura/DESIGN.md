---
name: Artisanal Florist
colors:
  surface: '#f8faf4'
  surface-dim: '#d8dbd5'
  surface-bright: '#f8faf4'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F1EEE8'
  surface-container: '#edefe9'
  surface-container-high: '#e7e9e3'
  surface-container-highest: '#e1e3de'
  on-surface: '#191c19'
  on-surface-variant: '#676A70'
  inverse-surface: '#2e312e'
  inverse-on-surface: '#eff1ec'
  outline: '#717971'
  outline-variant: '#c0c9bf'
  surface-tint: '#316944'
  primary: '#316944'
  on-primary: '#1F2421'
  primary-container: '#B7D8BF'
  on-primary-container: '#1a5431'
  inverse-primary: '#99d4a6'
  secondary: '#805256'
  on-secondary: '#ffffff'
  secondary-container: '#ffc2c6'
  on-secondary-container: '#7b4d51'
  tertiary: '#8d4a57'
  on-tertiary: '#ffffff'
  tertiary-container: '#f6a3b1'
  on-tertiary-container: '#743643'
  error: '#D96A6A'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b4f1c1'
  primary-fixed-dim: '#99d4a6'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#17512e'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#f3b7bb'
  on-secondary-fixed: '#321115'
  on-secondary-fixed-variant: '#653b3f'
  tertiary-fixed: '#ffd9de'
  tertiary-fixed-dim: '#ffb2be'
  on-tertiary-fixed: '#3a0816'
  on-tertiary-fixed-variant: '#703340'
  background: '#F8F7F3'
  on-background: '#35363A'
  surface-variant: '#D9DDD8'
  secondary-hover: '#E89DA5'
  secondary-light: '#F8D4D8'
  neutral-50: '#F8F7F3'
  neutral-100: '#F1EEE8'
  neutral-300: '#D9DDD8'
  neutral-500: '#676A70'
  neutral-900: '#35363A'
  success: '#6FBF73'
  warning: '#E7B857'
  info: '#73A8D8'
  dark-background: '#1F2421'
  dark-on-background: '#F3F3F0'
  dark-surface-variant: '#5A615D'
  dark-on-surface-variant: '#BFC5BE'
  dark-surface-container-low: '#2B302D'
  dark-neutral-50: '#BFC5BE'
  dark-neutral-100: '#8A918B'
  dark-neutral-300: '#5A615D'
typography:
  display-hero:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-xs:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-unit: 0.5rem
  space-1: 0.5rem
  space-2: 1rem
  space-3: 1.5rem
  space-4: 2rem
  space-5: 2.5rem
  space-6: 3rem
  space-8: 4rem
  space-10: 5rem
  gutter: 1.5rem
  margin-mobile: 1.25rem
  margin-desktop: 2.5rem
  section-gap: 7.5rem
  container-max: 80rem
---

DESIGN.md — La Jardinera Florería
Sistema de diseño oficial de la marca. Este documento es la fuente de verdad para color, tipografía y tokens visuales. Cualquier implementación (web, impresos, redes) debe referenciar estos valores, no valores aproximados.
1. Tipografía
Rol Familia Estilo Peso Uso Wordmark / Display Instrument Serif Itálica 400 (único disponible) Logotipo "La Jardinera", titulares hero, momentos de marca de alto impacto Headline Instrument Serif Normal 400 Subtítulos de sección, encabezados secundarios Body / UI Montserrat Normal 300–600 Párrafos, navegación, botones, formularios, labels
Import (Google Fonts):
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Montserrat:ital,wght@0,300..600;1,300..600&display=swap" rel="stylesheet">

Fallback stacks:
--font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
--font-body: "Montserrat", -apple-system, "Segoe UI", sans-serif;

Reglas de uso:
La itálica de Instrument Serif se reserva para el wordmark y momentos hero — no usar en párrafos largos (fatiga de lectura).
Montserrat en mayúsculas + tracking amplio (0.03–0.08em) para labels/navegación; en minúsculas para cuerpo de texto corrido.
Escala tipográfica sugerida (rem, base 16px): 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64.

2. Paleta de color — Modo claro
Roles semánticos (tokens principales)
Token Valor HEX RGB Uso
--color-primary #8CC79A 140 199 154 Color de marca principal — acentos, estados activos, íconos
--color-primary-container #B7D8BF 183 216 191 Fondos suaves sobre elementos con primary
--color-on-primary #1F2421 31 36 33 Texto/ícono sobre fondo primary (ver nota de contraste)
--color-background #F8F7F3 248 247 243 Fondo base de página
--color-on-background #35363A 53 54 58 Texto principal
--color-surface-variant #D9DDD8 217 221 216 Bordes, divisores, superficies secundarias
--color-on-surface-variant #676A70 103 106 112 Texto secundario / metadata
--color-surface-container-low #F1EEE8 241 238 232 Fondos de tarjetas/secciones alternas
--color-surface-container-lowest #FFFFFF 255 255 255 Fondos elevados (modales, dropdowns)

Acento secundario
Token Valor HEX Uso
--color-secondary #F4B8BC Acento rosa — CTAs alternativos, highlights puntuales
--color-secondary-hover #E89DA5 Estado hover de secondary
--color-secondary-light #F8D4D8 Fondos suaves con acento rosa

Neutros
Token Valor HEX
--color-neutral-50 #F8F7F3
--color-neutral-100 #F1EEE8
--color-neutral-300 #D9DDD8
--color-neutral-500 #676A70
--color-neutral-900 #35363A

Estados del sistema
Token Valor HEX Uso
--color-success #6FBF73 Confirmaciones, disponibilidad, envío exitoso
--color-warning #E7B857 Avisos, stock limitado
--color-error #D96A6A Errores de formulario, validaciones fallidas
--color-info #73A8D8 Mensajes informativos

3. Paleta de color — Modo oscuro
Token Valor HEX RGB
--color-primary #8CC79A 140 199 154 (se mantiene igual — es el color identidad de marca)
--color-primary-container #B7D8BF 183 216 191
--color-on-primary #1F2421 31 36 33
--color-background #1F2421 31 36 33
--color-on-background #F3F3F0 243 243 240
--color-surface-variant #5A615D 90 97 93
--color-on-surface-variant #BFC5BE 191 197 190
--color-surface-container-low #2B302D 43 48 45
--color-surface-container-lowest #2B302D 43 48 45

Escala de neutros oscuros:
Token Valor HEX
--color-dark-text #F3F3F0
--color-dark-neutral-50 #BFC5BE
--color-dark-neutral-100 #8A918B
--color-dark-neutral-300 #5A615D

4. Nota de accesibilidad y contraste
primary (#8CC79A) es un verde pastel de luminosidad media-alta. Sobre fondos claros funciona bien como acento, ícono o borde, pero el texto blanco sobre primary no alcanza contraste AA. Usar --color-on-primary: #1F2421 para texto/íconos sobre superficies primary.
on-background sobre background (#35363A sobre #F8F7F3) cumple AAA.
on-surface-variant sobre background cumple AA para texto de al menos 14px.
En modo oscuro, verificar siempre on-background (#F3F3F0) sobre background (#1F2421) — cumple AAA.

5. Radios, espaciado y elevación
--radius-sm: 0.25rem (4px);
--radius-lg: 0.5rem (8px);
--radius-xl: 0.75rem (12px);
--radius-full: 9999px;

--space-unit: 8px;
--space-gutter: 24px;
--space-margin: 40px;
--space-section-gap: 120px;
--container-max: 1280px;

--shadow-sm: 0 4px 12px -6px rgba(53,54,58,0.12);
--shadow-md: 0 12px 28px -12px rgba(53,54,58,0.18);
--shadow-lg: 0 20px 40px -20px rgba(53,54,58,0.22);
