<?
	if (!function_exists("get_card_table_id")) {
		function get_card_table_id() {
			static $count = 0;
			$count++;
			return "card-table-" . strval($count);
		}
	}

	$card_table_id = get_card_table_id();
?>

<section id="{{$card_table_id}}" class="card-table">
	<h2 id="{{$card_table_id}}__heading" class="card-table__heading">Services</h2>
	<div id="{{$card_table_id}}__grid" class="card-table__grid">
		@include('partials.element-set', [
			"template_slug" => "components.card",
			"dataSet" => [
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
				[
					"title" => "Lorem",
					"content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"imgAlt" => "some",
					"imgSrc" => get_template_directory_uri() . "/dist/images/search.svg",
				],
			],
			"sharedData" => [
				"class" => ["card-table__card"],
			],
		])
	</div>
</section>
