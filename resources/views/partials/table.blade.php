<?
	$block_class = "table";

	if (!isset($table_id_generator)) {
		$table_id_generator = App\IdGeneratorFactory::get_generator($block_class);
	}

	$id = $table_id_generator->make_id($slug);

	array_unshift($class, $block_class);

	if (!isset($shared_data)) {
		$shared_data = [];
	}
?>

<section id="{{$id}}" class="{{implode(" ", $class)}}">
	<h2 id="{{$id}}--heading" class="{{$block_class}}__heading">{!!$title!!}</h2>
	<div id="{{$id}}--container" class="{{$block_class}}__container">
		@include('partials.element-set', [
				"data_set" => $data_set,
				"shared_data" => $shared_data
			])
	</div>
</section>
