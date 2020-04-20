<?
	$block_class = "card";

	if (!isset($card_id_generator)) {
		$card_id_generator = App\IdGeneratorFactory::get_generator($block_class);
	}

	$id = $card_id_generator->make_id($slug);

	if (isset($class)) {
		array_unshift($class, $block_class);
	} else {
		$class = [$block_class];
	}

	$img["class"] = ["${block_class}__image"];
?>

<div id="{{$id}}"
	class="{{implode(" ", $class)}}">
	<div id="{{$id}}--image-container"
		class="card__image-container">
		@include("components.image", $img)
	</div>
	<h3 id="{{$id}}--title"
		class="card__title">
		{{$title}}
	</h3>
	<div id="{{$id}}--content"
		class="card__content">
		{{$content}}
	</div>
</div>
