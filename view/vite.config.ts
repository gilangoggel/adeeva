import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

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
		viteCommonjs(),
		tsconfigPaths(),
		react(),
	],
	define:{
		global:{}
	},
	optimizeDeps:{
		esbuildOptions:{
			plugins:[
				esbuildCommonjs(['react-dates'])
			]
		}
	}
}))
