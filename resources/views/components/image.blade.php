<?
	$id_generator = App\IdGeneratorFactory::get_generator($block_class);

	$image_id = $id_generator->make_id($slug, "image");

	// Determine handling process
	if (preg_match("/.svg$/", $src)) {
		// Inline SVGs
		$uri = get_template_directory_uri();
		$uri = preg_replace("/\//", "\/", $uri);
		$uri = preg_replace("/\./", "\.", $uri);
		$src = preg_replace("/${uri}/", get_template_directory(), $src);
		$svg = dom_import_simplexml(new SimpleXMLElement($src, 0, TRUE));
		$svg->setAttribute("id", $image_id);
		$svg->setAttribute("class", implode(" ", $class));
		$svg->appendChild(new DOMElement("title", $alt));
		?>
			{!! $svg->C14N() !!}
		<?
	} else {
		// Handle all other file types as img elements
		?>
			<img id="{{$image_id}}"
				class="{{implode(" ", $class)}}"
				src="{{$src}}"
				alt="{{$alt}}"/>
		<?
	}
?>
