<header class="banner">
	<nav class="nav-primary has-primary-background-color">
		<a class="brand" href="{{ home_url('/') }}">
			{{ $siteName }}
		</a>
		@if (has_nav_menu('primary_navigation'))
			{!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
		@endif
	</nav>
</header>
