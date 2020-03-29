<?
	if (!function_exists("get_image_id")) {
		function get_image_id() {
			static $count = 0;
			$count++;
			return "image-" . strval($count);
		}
	}

	$image_id = get_image_id();
?>

<img id="{{$image_id}}"
	class="{{implode(" ", $class)}} image"
	src="{{$src}}"
	alt="{{$alt}}"/>
