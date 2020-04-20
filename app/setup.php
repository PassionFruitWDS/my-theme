<?php

/**
 * Theme setup.
 *
 * @copyright https://roots.io/ Roots
 * @license   https://opensource.org/licenses/MIT MIT
 */

namespace App;

use function Roots\asset;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
	wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), [], null, true);
	wp_enqueue_script('sage/modernizer.js', asset('scripts/modernizer.js')->uri(), [], null, true);
	$translation_array = array(
		'themeUrl' => get_template_directory_uri(),
		'formFieldCtrConfig' => array(
			'activeStateClass' => 'form-field--active-state',
		),
		'contactFormCtrConfig' => array(
			'activeStateClass' => 'contact-form--is-active',
			'inFocusFieldClass' => 'contact-form__field--in-focus',
		),
		'carouselData' => array(
			array(
				'title' => 'Development',
				'content' => array(
					'Setting up a new site from scratch? Want to give your users new ways to interact? Need critical fixes?',
					'PassionFruit offers solutions to all your full-stack web development needs. We specialize in the time-tested tech of Wordpress and leverage modern tools and frameworks to achieve world-class performance. Never let your users see broken or half-finished features again, as PassionFruit strictly utilizes local development and pre-deployment testing.',
				),
				'imgSources' => array(
					'icon-one' => array(
						'src' => get_template_directory_uri() . '/dist/images/curly-brackets.svg',
						'alt' => 'Curly brackets',
					),
					'icon-two' => array(
						'src' => get_template_directory_uri() . '/dist/images/gear.svg',
						'alt' => 'Gear cog',
					),
					'icon-three' => array(
						'src' => get_template_directory_uri() . '/dist/images/bug-fix.svg',
						'alt' => 'Bug with wrench partially obscuring it',
					),
				),
			),
			array(
				'title' => 'Marketing',
				'content' => 'A site can be blazing fast and beautiful to look at, but it\'s nothing without content and visibility. With PassionFruit, there\'s no need to hire a new contractor to write your site\'s content. Our professional marketing services cover everything from copy writing to search engine optimization to web advertising.',
				'imgSources' => array(
					'icon-one' => array(
						'src' => get_template_directory_uri() . '/dist/images/at.svg',
						'alt' => 'At symbol',
					),
					'icon-two' => array(
						'src' => get_template_directory_uri() . '/dist/images/magnifying-glass.svg',
						'alt' => 'Magnifying glass',
					),
					'icon-three' => array(
						'src' => get_template_directory_uri() . '/dist/images/share.svg',
						'alt' => 'Web sharing symbol',
					),
				),
			),
			array(
				'title' => 'Design',
				'content' => array(
					'On the web, presentation is key. Look and feel set users\' impressions of a site and the business behind it, so design is a first-class concern. PassionFruit delivers with beautiful, modern, user-friendly pages and layouts.',
					'We believe you deserve to have your site reflect the passion that goes into your business. As such, we work closely with you to understand your vision for your brand and we craft a design to match.',
				),
				'imgSources' => array(
					'icon-one' => array(
						'src' => get_template_directory_uri() . '/dist/images/pencil.svg',
						'alt' => 'Pencil',
					),
					'icon-two' => array(
						'src' => get_template_directory_uri() . '/dist/images/responsive-smartphone.svg',
						'alt' => 'Smartphone displaying a responsive web layout',
					),
					'icon-three' => array(
						'src' => get_template_directory_uri() . '/dist/images/palette.svg',
						'alt' => 'Artist\'s palette',
					),
				),
			),
		),
	);
	wp_localize_script('sage/app.js', 'pageData', $translation_array);

	if (is_single() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	wp_enqueue_style('sage/app.css', asset('styles/app.css')->uri(), false, null);
}, 100);

/**
 * Prevent Block Library CSS from being loaded on frontend.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
	wp_dequeue_style('wp-block-library');
});

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
	if ($manifest = asset('scripts/manifest.asset.php')->get()) {
		wp_enqueue_script(
			'sage/editor.js',
			asset('scripts/editor.js')->uri(),
			$manifest['dependencies'],
			$manifest['version']
		);

		wp_add_inline_script('sage/editor.js', asset('scripts/manifest.js')->contents(), 'before');
	}

	wp_enqueue_style('sage/editor.css', asset('styles/editor.css')->uri(), false, null);
}, 100);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
	/**
	 * Enable features from Soil when plugin is activated
	 * @link https://roots.io/plugins/soil/
	 */
	add_theme_support('soil-clean-up');
	add_theme_support('soil-nav-walker');
	add_theme_support('soil-nice-search');
	add_theme_support('soil-relative-urls');

	/**
	 * Enable plugins to manage the document title
	 * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
	 */
	add_theme_support('title-tag');

	/**
	 * Register navigation menus
	 * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
	 */
	register_nav_menus([
		'primary_navigation' => __('Primary Navigation', 'sage')
	]);

	/**
	 * Enable post thumbnails
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support('post-thumbnails');

	/**
	 * Add theme support for Wide Alignment
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#wide-alignment
	 */
	add_theme_support('align-wide');

	/**
	 * Enable responsive embeds
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
	 */
	add_theme_support('responsive-embeds');

	/**
	 * Enable HTML5 markup support
	 * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
	 */
	add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

	/**
	 * Enable selective refresh for widgets in customizer
	 * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
	 */
	add_theme_support('customize-selective-refresh-widgets');

	/**
	 * Enable theme color palette support
	 * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes
	 */
	add_theme_support(
		'editor-color-palette',
		get_color_palette()
	);
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
	$config = [
		'before_widget' => '<section class="widget %1$s %2$s">',
		'after_widget' => '</section>',
		'before_title' => '<h3>',
		'after_title' => '</h3>'
	];

	register_sidebar([
		'name' => __('Primary', 'sage'),
		'id' => 'sidebar-primary'
	] + $config);

	register_sidebar([
		'name' => __('Footer', 'sage'),
		'id' => 'sidebar-footer'
	] + $config);
});

/**
 * Inject color palette custom properties into head.
 *
 * @return void
 */
add_action('wp_head', function () {
	echo '<style type="text/css">';
	echo ':root {';
	foreach (get_color_palette() as $color_swatch) {
		echo('--' . $color_swatch['slug'] . '-color: ' . $color_swatch['color'] . ';');
		echo('--' . $color_swatch['slug'] . '-rgb: ' . hex2rgb($color_swatch['color']) . ';');
	}
	echo '}';
	echo '</style>';
});

/**
 * Inject theme uri custom property into head.
 *
 * @return void
 */
add_action('wp_head', function() {
	echo '<style type="text/css">';
	echo ':root {';
	echo('--hero-webp-url: url(' . get_template_directory_uri() . '/dist/images/hero--medium.webp);');
	echo('--hero-png-url: url(' . get_template_directory_uri() . '/dist/images/hero--medium.png);');
	echo('--tower-top-webp-url: url(' . get_template_directory_uri() . '/dist/images/tower_top.webp);');
	echo('--tower-top-jp2-url: url(' . get_template_directory_uri() . '/dist/images/tower_top.jp2);');
	echo '}';
	echo '</style>';
});
