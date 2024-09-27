// vitest.config.js or vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node', // Ensure Vitest runs in a Node.js environment
  },
})
