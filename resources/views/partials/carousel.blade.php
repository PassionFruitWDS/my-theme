<?
	$block_class = "carousel";

	if (!isset($carousel_id_generator)) {
		$carousel_id_generator = App\IdGeneratorFactory::get_generator($block_class);
	}

	$id = $carousel_id_generator->make_id($slug);

	if (isset($class)) {
		array_unshift($class, $block_class);
	} else {
		$class = [$block_class];
	}
?>

<section id="{{$id}}" class="{{implode(" ", $class)}}">
	<span id="{{$id}}--controls" class="{{$block_class}}__controls">
		<button id="{{$id}}--back" class="{{$block_class}}__button"><</button>
		<span id="{{$id}}--prev" class="{{$block_class}}__heading"></span>
		<h2 id="{{$id}}--current" class="{{$block_class}}__heading {{$block_class}}__heading--big"></h2>
		<span id="{{$id}}--next" class="{{$block_class}}__heading"></span>
		<button id="{{$id}}--frwd" class="{{$block_class}}__button">></button>
	</span>
	<div id="{{$id}}--container" class="{{$block_class}}__container">
		@include("partials.element-set", [
			"data_set" => $data_set,
			"shared_data" => $shared_data,
		])
	</div>
</section>
