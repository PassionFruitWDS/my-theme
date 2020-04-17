<?
	$id_generator = App\IdGeneratorFactory::get_generator($block_class);

	if (isset($id_modifier)) {
		$id = $generic_id_generator->make_id($slug, $id_modifier);
	} else {
		$id = $generic_id_generator->make_id($slug);
	}
?>

<picture>
	<?
		if (isset($sources)) {
			foreach ($sources as $source) {
				?>
					<source srcset="{{$source["src"]}}" type="{{$source["type"]}}">
				<?
			}
		}
	?>
	<img id="{{$id}}"
		class="{{implode(" ", $class)}}"
		src="{{$img["src"]}}"
		width="{{$img["width"]}}"
		alt="{{$img["alt"]}}" />
</picture>
