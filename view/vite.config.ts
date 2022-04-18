import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(( ) => ({
	build: {
		// generate manifest.json in outDir
		manifest: true,
		rollupOptions: {
			// overwrite default .html entry
			input: '/src/main.js'
		}
	},
	plugins: [
		tsconfigPaths(),
		react()
	]
}))
