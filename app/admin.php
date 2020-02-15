<?php

/**
 * Theme admin.
 *
 * @copyright https://roots.io/ Roots
 * @license   https://opensource.org/licenses/MIT MIT
 */

namespace App;

use WP_Customize_Color_Control;
use WP_Customize_Manager;

use function Roots\asset;

/**
 * Register the `.brand` selector as the blogname.
 *
 * @param  \WP_Customize_Manager $wp_customize
 * @return void
 */
add_action('customize_register', function (WP_Customize_Manager $wp_customize) {
	$wp_customize->get_setting('blogname')->transport = 'postMessage';
	$wp_customize->selective_refresh->add_partial('blogname', [
		'selector' => '.brand',
		'render_callback' => function () {
			bloginfo('name');
		}
	]);
});

/**
 * Register the color palette customizer
 *
 * @param \WP_Customize_Manager $wp_customize
 * @return void
 */
add_action('customize_register', function (WP_Customize_Manager $wp_customize) {

	$section_id = 'sage-color-customization-section';
	$wp_customize->add_section(
		$section_id,
		array(
			'title' => __('Color Palette', 'sage'),
			'description' => __('Change the color palette used by the theme and block editor', 'sage')
		)
	);

	foreach (get_default_color_palette() as $color_swatch) {
		$setting_id = $color_swatch['slug'] . '-color-setting';
		$wp_customize->add_setting(
			$setting_id,
			array(
				'transport' => 'postMessage',
				'default' => $color_swatch['color'],
				'sanitize_callback' => 'sanitize_hex_color'
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$color_swatch['slug'] . '-color-control',
				array(
					'label' => $color_swatch['name'],
					'section' => $section_id,
					'settings' => $setting_id
				)

			)
		);
	}
});

/**
 * Register the customizer assets.
 *
 * @return void
 */
add_action('customize_preview_init', function () {
	wp_enqueue_script('sage/customizer.js', asset('scripts/customizer.js')->uri(), ['customize-preview'], null, true);
});
