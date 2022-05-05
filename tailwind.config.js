module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  // Mantineに合わせる
  theme: {
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
  },
  plugins: [],
}
