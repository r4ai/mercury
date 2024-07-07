import { defineConfig, type UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const app = async (): Promise<UserConfigExport> =>
	defineConfig({
		plugins: [react(), tailwindcss()],
	});
export default app
