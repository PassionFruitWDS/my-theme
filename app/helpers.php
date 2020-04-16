<?php

/**
 * Theme helpers.
 *
 * @copyright https://roots.io/ Roots
 * @license   https://opensource.org/licenses/MIT MIT
 */

namespace App;

use DomainException;
use UnexpectedValueException;

class Counter {
	private $count = 0;
	protected function getCount() {
		return $this->count++;
	}
}

class IdGeneratorFactory {
	private static $known_generators = [];
	public static function get_generator(string $name) {
		if (array_key_exists($name, IdGeneratorFactory::$known_generators)) {
			return IdGeneratorFactory::$known_generators[$name];
		} else {
			return IdGeneratorFactory::create_generator($name);
		}
	}

	/**
	 * Resolve whether a name candidate is valid for use
	 *
	 * @param string $name Candidate to be checked for validity
	 * @return boolean indicator of the candidate's validity for use
	 */
	private static function is_valid_name(string $name) {
		// May not be empty
		$is_valid = ("" !== $name);
		// May not begin with a hyphen
		$is_valid = $is_valid && !preg_match("/^-/", $name);
		// May only consist of lower-case letters and hyphens
		$is_valid = $is_valid && !preg_match("/[^a-z-]/", $name);

		return $is_valid;
	}

	/**
	 * Make a new id generator seeded with a valid, unique name
	 *
	 * @param string $name Valid unique name to seed the generator with
	 * @return object id generator as an instance of an anonymous class
	 * @remark Anonymous class used as PHP lacks class nesting and access to what would be the `IdGenerator` class's constructor must be encapsulated to enforce generated id uniqueness
	 */
	private static function create_generator($name) {
		assert(
			IdGeneratorFactory::is_valid_name($name),
			new DomainException("Badly formatted id generator name: '${name}'")
		);

		$generator = new class($name) extends Counter {
			private $name;
			private $known_slugs = [];

			/**
			 * @param string $name Factory name
			 */
			function __construct(string $name) {
				$this->name = $name;
			}

			/**
			 * Resolves uniqueness of a candidate id modifier for a given id slug
			 *
			 * @param string $modifier Id modifier to be evaluated
			 * @param string $slug Id slug to which the modifier will be applied
			 * @return boolean Indicator of the candidate's uniqueness as a modifier of the slug
			 * @remark Modifiers determined to be unique are remembered for future comparisons
			 */
			protected function is_mod_unique_for_slug(string $modifier, string $slug) {
				$is_mod_unique = TRUE;
				$is_slug_new = $this->is_id_slug_unique($slug);

				if (
					$is_slug_new
					|| !in_array($modifier, $this->known_slugs[$slug])
				) {
					array_push($this->known_slugs[$slug], $modifier);
				} else {
					$is_mod_unique = FALSE;
				}

				return $is_mod_unique;
			}

			/**
			 * Resolves uniqueness of a candidate id slug for this factory
			 *
			 * @param string $slug Id slug to be evaluated
			 * @return boolean Indicator of candidate's uniqueness as an id slug
			 * @remark Slugs determined to be unique are remembered for future comparisons
			 */
			protected function is_id_slug_unique(string $slug) {
				$is_unique = !array_key_exists($slug, $this->known_slugs);

				if ($is_unique) {
					$this->known_slugs[$slug] = [];
				}

				return $is_unique;
			}

			/**
			 * Create a new id
			 *
			 * @param string|null $slug (optional) Unique slug to use in the id
			 * @return string Unique id of form `"${slug}-${component-name}"` if a valid `$slug` was provided, otherwise of form `"${component-name}-${id_number}"`
			 */
			public function make_id(string $slug = null, string $modifier = null) {
				$name = $this->name;

				if (
					is_string($slug)
					&& is_slug_valid_for_id($slug)
				) {
					if (is_string($modifier)) {
						if (
							is_slug_valid_for_id($modifier)
							&& $this->is_mod_unique_for_slug($modifier, $slug)
						) {
							$id = "${slug}__${name}--${modifier}";
						}
					} else if ($this->is_id_slug_unique($slug)) {
						$id = "${slug}__${name}";
					}
				}

				if (!isset($id)) {
					$id_number = strval($this->getCount());
					$id = "${name}-${id_number}";
				}

				return $id;
			}
		};

		IdGeneratorFactory::$known_generators[$name] = $generator;
		return $generator;
	}
}

/**
 * Check if a slug may be used for an element id
 *
 * @param string $slug String slug to be validated
 * @return is_valid Boolean indicator of slug validity
 */
function is_slug_valid_for_id(string $slug) {
	// May not be empty
	$is_valid = ("" !== $slug);
	// May consist only of lower-case letters, numbers, and hyphens
	$is_valid = $is_valid && !preg_match("/[^a-z-0-9]/", $slug);
	// May not begin with a number or hyphen
	$is_valid = $is_valid && !preg_match("/^([0-9]|-)/", $slug);

	return $is_valid;
}

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
