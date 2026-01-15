import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ប្រសិនបើអ្នកចង់ប្រើ path alias

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ប្រសិនបើអ្នកចង់ឱ្យការហៅរូបភាពងាយស្រួលជាងមុន
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/assets/ak.png"),
    },
  },
})