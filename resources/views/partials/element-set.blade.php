<?foreach ($dataSet as $data) {?>
	@include($template_slug, array_merge($data, $sharedData))
<?}?>
