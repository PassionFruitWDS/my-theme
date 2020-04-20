<?
	$generic_id_generator = App\IdGeneratorFactory::get_generator($block_class);

	if (isset($id_modifier)) {
		$id = $generic_id_generator->make_id($slug, $id_modifier);
	} else {
		$id = $generic_id_generator->make_id($slug);
	}

	$attr_string = "";
	if (isset($attr)) {
		foreach($attr as $name => $value) {
			$attr_string = "${attr_string} ${name}=\"${value}\"";
		}
	}
?>

<{{$tag}} id="{{$id}}" class="{{implode(" ", $class)}}" {!!$attr_string!!}
@if (($tag === "img") | ($tag === "input"))
	/>
@else
	>
		@isset($inner)
			@include($inner["template"], $inner["data"])
		@endisset
	</{{$tag}}>
@endif
