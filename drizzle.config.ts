import { defineConfig } from "drizzle-kit";
import { dbUrl } from "@/lib/db";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/db/schemas",
	dialect: "postgresql",
	dbCredentials: {
		url: dbUrl,
	},
});
