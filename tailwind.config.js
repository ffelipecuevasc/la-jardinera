/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
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
        "warning": "#E7B857", "dark-on-surface-variant": "#BFC5BE", "surface-container-highest": "#e1e3de", "outline": "#717971", "dark-neutral-100": "#8A918B", "outline-variant": "#c0c9bf", "dark-background": "#1F2421", "on-secondary-container": "#7b4d51", "tertiary-fixed-dim": "#ffb2be", "tertiary": "#8d4a57", "primary-container": "#8cc79a", "on-tertiary-fixed-variant": "#703340", "on-error": "#ffffff", "on-error-container": "#93000a", "dark-neutral-50": "#BFC5BE", "surface-container": "#edefe9", "neutral-100": "#F1EEE8", "background": withOpacity('--color-background'), "on-secondary-fixed-variant": "#653b3f", "surface-container-low": withOpacity('--color-surface-container-low'), "on-tertiary-fixed": "#3a0816", "on-background": withOpacity('--color-on-background'), "on-primary-fixed-variant": "#17512e", "on-primary": "#1F2421", "on-tertiary": "#ffffff", "surface-container-high": "#e7e9e3", "primary-fixed-dim": "#99d4a6", "surface-dim": "#d8dbd5", "secondary-light": "#F8D4D8", "dark-on-background": "#F3F3F0", "on-surface-variant": withOpacity('--color-on-surface-variant'), "primary-fixed": "#b4f1c1", "on-surface": withOpacity('--color-on-surface'), "on-secondary": "#ffffff", "neutral-300": "#D9DDD8", "on-tertiary-container": "#743643", "neutral-50": "#F8F7F3", "secondary-container": "#ffc2c6", "neutral-500": "#676A70", "surface-tint": "#316944", "dark-surface-container-low": "#2B302D", "secondary-fixed": "#ffdadb", "error": "#D96A6A", "primary": "#316944", "surface-variant": "#e1e3de", "surface-container-lowest": "#ffffff", "surface-bright": "#f8faf4", "inverse-surface": "#2e312e", "on-secondary-fixed": "#321115", "dark-surface-variant": "#5A615D", "secondary-hover": "#E89DA5", "tertiary-fixed": "#ffd9de", "inverse-primary": "#99d4a6", "dark-neutral-300": "#5A615D", "error-container": "#ffdad6", "neutral-900": "#35363A", "on-primary-fixed": "#00210d", "secondary": "#805256", "surface": withOpacity('--color-surface'), "on-primary-container": "#1a5431", "secondary-fixed-dim": "#f3b7bb", "tertiary-container": "#f6a3b1", "inverse-on-surface": "#eff1ec", "info": "#73A8D8", "success": "#6FBF73"
      },
      borderRadius: {
        "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"
      },
      spacing: {
        "space-1": "0.5rem", "space-10": "5rem", "space-8": "4rem", "gutter": "1.5rem", "margin-mobile": "1.25rem", "container-max": "80rem", "space-6": "3rem", "section-gap": "7.5rem", "space-5": "2.5rem", "space-unit": "0.5rem", "space-2": "1rem", "margin-desktop": "2.5rem", "space-3": "1.5rem", "space-4": "2rem"
      },
      fontFamily: {
        "label-md": ["Montserrat", "sans-serif"], "headline-lg": ["Noto Serif", "serif"], "display-hero-mobile": ["Noto Serif", "serif"], "body-xs": ["Montserrat", "sans-serif"], "body-sm": ["Montserrat", "sans-serif"], "label-lg": ["Montserrat", "sans-serif"], "headline-sm": ["Noto Serif", "serif"], "display-hero": ["Noto Serif", "serif"], "headline-md": ["Noto Serif", "serif"], "body-md": ["Montserrat", "sans-serif"], "label-sm": ["Montserrat", "sans-serif"], "headline-xl-mobile": ["Noto Serif", "serif"], "body-lg": ["Montserrat", "sans-serif"], "headline-xl": ["Noto Serif", "serif"]
      },
      fontSize: {
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "400" }], "display-hero-mobile": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "400" }], "body-xs": ["12px", { "lineHeight": "16px", "fontWeight": "400" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.06em", "fontWeight": "600" }], "headline-sm": ["18px", { "lineHeight": "26px", "fontWeight": "400" }], "display-hero": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "400" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.05em", "fontWeight": "500" }], "headline-xl-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "400" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.015em", "fontWeight": "400" }]
      }
    }
  },
  plugins: [],
}