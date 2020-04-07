@extends('layouts.app')

@section('view-class', 'home')

@section('main')
	@include('partials.hero')
	<div id="home__content" class="content">
		@include('partials.carousel', [
			"slug" => "featured",
			"class" => [],
			"shared_data" => [],
			"data_set" => [
				[
					"template" => "components.generic",
					"tag" => "div",
					"block_class" => "copy",
					"slug" => "featured",
					"class" => ["copy"],
					"inner" => null,
				],
				[
					"template" => "components.generic",
					"tag" => "div",
					"block_class" => "towers",
					"slug" => "featured",
					"class" => ["towers"],
					"inner" => [
						"template" => "partials.element-set",
						"data" => [
							"shared_data" => [
								"class" => ["towers__image"],
							],
							"data_set" => [
								[
									"template" => "components.generic",
									"tag" => "img",
									"id_modifier" => "background",
									"class" => ["towers__image--background"],
									"attr" => [
										"src" => get_template_directory_uri() . "/dist/images/passionfruit-towers.png",
										"alt" => "Three isometric towers in a park like setting with icons floating above each tower",
									]
								],
								[
									"template" => "components.generic",
									"tag" => "img",
									"id_modifier" => "icon-one",
									"class" => [],
									"attr" => [
										"src" => "",
										"alt" => "",
									],
								],
								[
									"template" => "components.generic",
									"tag" => "img",
									"id_modifier" => "icon-two",
									"class" => [],
									"attr" => [
										"src" => "",
										"alt" => "",
									],
								],
								[
									"template" => "components.generic",
									"tag" => "img",
									"id_modifier" => "icon-three",
									"class" => [],
									"attr" => [
										"src" => "",
										"alt" => "",
									],
								],
							],
						],
					],
				],
			],
		])
		@include('partials.table', [
			"slug" => "services",
			"title" => "How can <em data-value=\"PassionFruit\">PassionFruit</em> help?",
			"class" => [],
			"shared_data" => [
				"template" => "components.card",
				"class" => [],
			],
			"data_set" => [
				[
					"slug" => "wordpress",
					"title" => "Wordpress Artistry",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					"img" => [
						"alt" => "Wordpress logo",
						"src" => get_template_directory_uri() . "/dist/images/wp_logo.svg",
					],
				],
				[
					"slug" => "seo",
					"title" => "World Class SEO",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"img" => [
						"alt" => "Magnifying glass scanning over web links",
						"src" => get_template_directory_uri() . "/dist/images/seo.svg",
					],
				],
				[
					"slug" => "debugging",
					"title" => "Critical Repairs",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"img" => [
						"alt" => "Bug targeted in crosshairs",
						"src" => get_template_directory_uri() . "/dist/images/debug.svg",
					],
				],
				[
					"slug" => "development",
					"title" => "Custom App Development",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"img" => [
						"alt" => "Rocketship blasting off with trailing action lines",
						"src" => get_template_directory_uri() . "/dist/images/app.svg",
					],
				],
				[
					"slug" => "design",
					"title" => "On-Trend Designs",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"img" => [
						"alt" => "Artist's palette and wetted brush with sparkle accents",
						"src" => get_template_directory_uri() . "/dist/images/paint_tools.svg",
					],
				],
				[
					"slug" => "consultation",
					"title" => "Expert Consultations",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"img" => [
						"alt" => "Clean-cut professional with glasses, collared shirt, and sweater",
						"src" => get_template_directory_uri() . "/dist/images/expert.svg",
					],
				],
			],
		])
	</div>
@endsection
