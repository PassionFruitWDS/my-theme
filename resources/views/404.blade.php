@extends('layouts.app')

@section('view-class', '404')

@section('main')
	@include('partials.page-header')

	@if (! have_posts())
		@alert(['type' => 'warning'])
			{{ __('Sorry, but the page you were trying to view does not exist.', 'sage') }}
		@endalert

		{!! get_search_form(false) !!}
	@endif
@endsection
