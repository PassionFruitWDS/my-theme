@extends('layouts.app')

@section('view-class', 'search')

@section('main')
	@include('partials.page-header')

	@if (! have_posts())
		@alert(['type' => 'warning'])
			{{ __('Sorry, no results were found.', 'sage') }}
		@endalert

		{!! get_search_form(false) !!}
	@endif

	@while(have_posts()) @php(the_post())
		@include('partials.content-search')
	@endwhile

	{!! get_the_posts_navigation() !!}
@endsection
