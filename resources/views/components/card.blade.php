<?
	if (!function_exists("get_card_id")) {
		function get_card_id() {
			static $count = 0;
			$count++;
			return "card-" . strval($count);
		}
	}

	$card_id = get_card_id();
?>

<div id="{{$card_id}}"
	class="{{implode(" ", $class)}} card">
	<div id="{{$card_id}}__thumbnail-outer"
		class="card__thumbnail-outer">
		@include("components.image", [
			"class" => ["card__thumbnail-inner"],
			"src" => $imgSrc,
			"alt" => $imgAlt,
		])
	</div>
	<h3 id="{{$card_id}}__title"
		class="card__title">
		{{$title}}
	</h3>
	<div id="{{$card_id}}__content"
		class="card__content">
		{{$content}}
	</div>
</div>
