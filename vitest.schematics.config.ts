import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['projects/hviktor/schematics/**/*.spec.ts'],
    environment: 'node',
  },
});
