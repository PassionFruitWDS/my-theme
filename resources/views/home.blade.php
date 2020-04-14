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
										"src" => get_template_directory_uri() . "/dist/images/passionfruit-towers.webp",
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
					"content" => "In the right hands, Wordpress is an immensly powerful tool for building and managing beautiful, performant sites. PassionFruit brings talent and experience to bear, crafting artisan Wordpress sites, plugins, and themes. We leverage modern tools to ensure peek performance and tailor site features and plugins to your needs. Whether it be Elementor layouts, Block Editor widgets, or WooCommerce integration, PassionFruit has you covered.",
					"img" => [
						"alt" => "Wordpress logo",
						"src" => get_template_directory_uri() . "/dist/images/wp_logo.svg",
					],
				],
				[
					"slug" => "seo",
					"title" => "World-Class SEO",
					"content" => "Websites live and breathe search engine optimization (SEO). Your site does nothing for you if users can't find it, and PassionFruit stands ready to help you outrank the competition. Leveraging the power of tools such as Google Analytics and Yoast, we identify and fix the issues keeping your site from appearing in those coveted first-page results.",
					"img" => [
						"alt" => "Magnifying glass scanning over web links",
						"src" => get_template_directory_uri() . "/dist/images/seo.svg",
					],
				],
				[
					"slug" => "debugging",
					"title" => "Critical Repairs",
					"content" => "Bugs happen. Whether it was bad developers, breaking software updates, or changes made by your hosting service, all you know is that you need the bug found and fixed ASAP. PassionFruit's wide range of experience and capabilities allow us to troubleshoot and repair your site in record time.",
					"img" => [
						"alt" => "Bug targeted in crosshairs",
						"src" => get_template_directory_uri() . "/dist/images/debug.svg",
					],
				],
				[
					"slug" => "development",
					"title" => "Custom App Development",
					"content" => "Do you have an idea for a new way you want users to interact with your site? Perhaps you want a scheduling applet for appointments? Maybe you want an interactive comparison of your product to the competition? PassionFruit can turn your idea into reality, giving your site the edge or capability you're looking for.",
					"img" => [
						"alt" => "Rocketship blasting off with trailing action lines",
						"src" => get_template_directory_uri() . "/dist/images/app.svg",
					],
				],
				[
					"slug" => "design",
					"title" => "On-Trend Designs",
					"content" => "A site that looks outdated looks unmaintained and, worse, reflects badly on the business it's for. PassionFruit stays on top of the latest trends and designs so you don't have to. We pick the best features of trending designs to ensure your site looks current, and we leave gimicks that hurt user experience on the cutting room floor.",
					"img" => [
						"alt" => "Artist's palette and wetted brush with sparkle accents",
						"src" => get_template_directory_uri() . "/dist/images/paint_tools.svg",
					],
				],
				[
					"slug" => "consultation",
					"title" => "Expert Consultations",
					"content" => "PassionFruit utilizes and stays up to date on the state of the art of web development. We provide consultations for site owners and fellow developers seeking advice and guidance on a range of topics. A by no means inclusive list includes: host selection, stack selection and architecting, dev-ops issues, design reviews, API design, and application design.",
					"img" => [
						"alt" => "Clean-cut professional with glasses, collared shirt, and sweater",
						"src" => get_template_directory_uri() . "/dist/images/expert.svg",
					],
				],
			],
		])
	</div>
@endsection
