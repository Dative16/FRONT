module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e293b",      // Sidebar dark slate
        secondary: "#0f172a",    // Darker hover/active background
        accent: "#3b82f6",       // Accent blue
        lightBg: "#f9fafb",      // Dashboard background
        lightCard: "#ffffff",    // Card background
        textPrimary: "#111827",  // Main text
        textSecondary: "#6b7280" // Secondary text
      },
    },
  },
  plugins: [],
};
