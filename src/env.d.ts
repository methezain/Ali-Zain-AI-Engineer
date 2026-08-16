/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly PUBLIC_GA_MEASUREMENT_ID?: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
	readonly PUBLIC_BING_SITE_VERIFICATION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}