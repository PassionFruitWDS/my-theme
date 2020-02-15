<?php

/**
 * Theme helpers.
 *
 * @copyright https://roots.io/ Roots
 * @license   https://opensource.org/licenses/MIT MIT
 */

namespace App;

function get_color_palette() {
	return array_map(function ($color_swatch) {

		$color_swatch['color'] = get_theme_mod(
			$color_swatch['slug'] . '-color-setting',
			$color_swatch['color']
		);
		return $color_swatch;
	}, get_default_color_palette());
}

function get_default_color_palette() {
	return array(
		array(
			'name'  => __('Primary', 'sage'),
			'slug'  => 'primary',
			'color' => '#EC7A00',
		),
		array(
			'name' => __('Secondary', 'sage'),
			'slug' => 'secondary',
			'color' => '#0072EC'
		),
		array(
			'name' => __('Dark Primary', 'sage'),
			'slug' => 'dark-primary',
			'color' => '#DC5100'
		),
		array(
			'name' => __('Light Primary', 'sage'),
			'slug' => 'light-primary',
			'color' => '#F8B44D'
		),
		array(
			'name' => __('Dark Secondary', 'sage'),
			'slug' => 'dark-secondary',
			'color' => '#173FBA'
		),
		array(
			'name' => __('Light Secondary', 'sage'),
			'slug' => 'light-secondary',
			'color' => '#56B4FF'
		),
		array(
			'name' => __('Primary Accent', 'sage'),
			'slug' => 'primary-accent',
			'color' => '#EC0400'
		),
		array(
			'name' => __('Primary Accent Alternate', 'sage'),
			'slug' => 'primary-accent-alternate',
			'color' => '#E8EC00'
		),
		array(
			'name' => __('Secondary Accent', 'sage'),
			'slug' => 'secondary-accent',
			'color' => '#72EC00'
		),
		array(
			'name' => __('Secondary Accent Alternate', 'sage'),
			'slug' => 'secondary-accent-alternate',
			'color' => '#00EC7A'
		)
	);
}
