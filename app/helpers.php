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
			'color' => '#0072EC',
		),
		array(
			'name' => __('Secondary', 'sage'),
			'slug' => 'secondary',
			'color' => '#EC7A00'
		),
		array(
			'name' => __('Dark Primary', 'sage'),
			'slug' => 'dark-primary',
			'color' => '#173FBA'
		),
		array(
			'name' => __('Light Primary', 'sage'),
			'slug' => 'light-primary',
			'color' => '#0093FF'
		),
		array(
			'name' => __('Dark Secondary', 'sage'),
			'slug' => 'dark-secondary',
			'color' => '#DC5100'
		),
		array(
			'name' => __('Light Secondary', 'sage'),
			'slug' => 'light-secondary',
			'color' => '#F69502'
		),
		array(
			'name' => __('Primary Accent', 'sage'),
			'slug' => 'primary-accent',
			'color' => '#00E8EC'
		),
		array(
			'name' => __('Primary Accent Alternate', 'sage'),
			'slug' => 'primary-accent-alternate',
			'color' => '#0400EC'
		),
		array(
			'name' => __('Secondary Accent', 'sage'),
			'slug' => 'secondary-accent',
			'color' => '#7A00EC'
		),
		array(
			'name' => __('Secondary Accent Alternate', 'sage'),
			'slug' => 'secondary-accent-alternate',
			'color' => '#EC0072'
		)
	);
}

function hex2rgb( $colour ) {
	if ( $colour[0] == '#' ) {
			$colour = substr( $colour, 1 );
	}
	if ( strlen( $colour ) == 6 ) {
			list( $r, $g, $b ) = array( $colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5] );
	} elseif ( strlen( $colour ) == 3 ) {
			list( $r, $g, $b ) = array( $colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2] );
	} else {
			return false;
	}
	$r = hexdec( $r );
	$g = hexdec( $g );
	$b = hexdec( $b );
	return "{$r}, {$g}, {$b}";
}
