<?
	foreach ($data_set as $data) {
		$current_data = array_merge_recursive($data, $shared_data);
		?>
			@include($current_data["template"], $current_data)
		<?

		unset($data);
	}
?>
