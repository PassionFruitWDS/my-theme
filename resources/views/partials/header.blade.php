<header class="banner">
	<nav class="nav-primary has-primary-background-color">
		<a class="brand" href="{{ home_url('/') }}">
			{{ $siteName }}
		</a>
		@if (has_nav_menu('primary_navigation'))
			{!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
			<label class="hamburger-label">
				<button class="hamburger hamburger--emphatic"
					type="button"
					aria-label="Menu"
					aria-controls="navigation"
				>
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
				</button>
				MENU
			</label>
		@endif
	</nav>
</header>
