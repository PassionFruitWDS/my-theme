const mix = require('laravel-mix');
				require('@tinypixelco/laravel-mix-wp-blocks');
				require('laravel-mix-copy-watched');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('./dist')
	.browserSync({
		proxy: {
			target: `http://${process.env.DOMAIN_NAME}.${process.env.TLD}:${process.env.PORT}`,
		},
		open: false,
	});

mix.sass('resources/assets/styles/app.scss', 'styles')
	.sass('resources/assets/styles/editor.scss', 'styles');

mix.ts('resources/assets/scripts/app.ts', 'scripts')
	.js('resources/assets/scripts/customizer.js', 'scripts')
	.blocks('resources/assets/scripts/editor.js', 'scripts');

mix.copyWatched('resources/assets/images/**', 'dist/images')
	.copyWatched('resources/assets/fonts/**', 'dist/fonts');

mix.options({
  processCssUrls: false,
});

mix.sourceMaps(false, 'source-map')
	.version();
