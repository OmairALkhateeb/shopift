/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
    },
    colors: {
      ...colors,
      transparent: "transparent",
      Mgray900: "#171717",
      Mgray800: "#262626",
      Mgray700: "#404040",
      Mgray600: "#525252",
      Mgray500: "#737373",
      Mgray400: "#a3a3a3",
      Mgray300: "#d4d4d4",
      Mgray200: "#eaecf0",
      Mgray100: "#f5f5f5",
      Mgray50: "#fafafa",
      Mneutralwhite: "#ffffff",
      Malertswarning: "#ffcc00",
      Malertserror: "#ff3b30",
      Malertssucces: "#34c759",
      Mmaincolorgreen: "#57a481",
      Mneutralbgsecondary: "#f9fafb",
      Mneutralgray: "#ededed",
      Mmaincolorlightgreen: "#c7f080",
      Msurfacesurfaceinvert: "#171717",
      Msurfacesurfacebrand: "#57a481",
      Mtexttextprimary: "#171717",
      Mtexttextsecondary: "#737373",
      Mtexttextbrand: "#57a481",
      Mtexttextinvert: "#a3a3a3",
      Mborderborderprimary: "#eaecf0",
      Msurfacesurfacetertiary: "#ededed",
      Msurfacesurfaceprimary: "#ffffff",
      Msurfacesurfacesecondary: "#f9fafb",
    },
    screens: {
      xxs: "375px",
      xx: "425px",
      ss: "480px",
      xs: "576px",
      xl1440: "1440px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
