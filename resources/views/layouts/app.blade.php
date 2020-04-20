<!doctype html>
<html {!! get_language_attributes() !!}>
	@include('partials.head')

	<body @php(body_class())>
		<div id="app" class="@yield('view-class')">
			@php(wp_body_open())
			@php(do_action('get_header'))

			<main>
				@yield('main')
			</main>

			@php(do_action('get_footer'))
			@include('partials.footer')
		</div>

		@php(wp_footer())
	</body>
</html>
