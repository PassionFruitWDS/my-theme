<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	@if (is_home())
		<meta name="description" content="PassionFruit provides world-class web development, design, and marketing solutions to businesses and organizations. Modern, beautiful, robust sites for any scale or market.">
		<meta name="og:title" content="Bringing passion for business online. PassionFruit WDS®">
		<meta name="og:type" content="website">
		<meta name="og:locale" content="en_US">
		<meta name="og:descritpion" content="PassionFruit provides world-class web development, design, and marketing solutions to businesses and organizations. Modern, beautiful, robust sites for any scale or market.">
		<meta name="og:image" content="{{ get_template_directory_uri() }}/dist/images/pfwds-logo--small.png">
		{{-- @FIXME --}}
		<meta name="og:url" content="https://passionfruitwd.wpengine.com">
		<meta name="og:site_name" content="PassionFruit Web Development Studio">
		@if (is_ssl())
			<meta name="og:image:secure_url" content="{{ get_template_directory_uri() }}/dist/images/pfwds-logo--small.png">
		@endif
		<meta name="og:image:type" content="image/png">
		<meta property="og:image:width" content="557">
		<meta property="og:image:height" content="100">
		<meta property="og:image:alt" content="A passion fruit cut in half sitting next to the words PassionFruit Web Development Studio">
		<meta property="twitter:card" content="summary">
		<meta property="twitter:image:alt" content="A passion fruit cut in half sitting next to the words PassionFruit Web Development Studio">
	@endif
	@php(wp_head())
</head>
