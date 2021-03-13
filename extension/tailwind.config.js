module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        "2base": "0.9rem",
        "2xs": "0.625rem",
        "2.5xs": "0.575rem",
        "3xs": "0.5rem",
        "4xs": "0.45rem",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "n-turqoise": "#86BDA6",
        "n-green": "#26BD58",
        "n-aquablue": "#0085FF",
        "n-grey": "#8E99A6",
        "n-dullBlue": "#7492B6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
