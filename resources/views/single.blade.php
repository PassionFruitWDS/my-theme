@extends('layouts.app')

@section('view-class', 'single')

@section('main')
	@while(have_posts()) @php(the_post())
		@includeFirst(['partials.content-single-' . get_post_type(), 'partials.content-single'])
	@endwhile
@endsection
