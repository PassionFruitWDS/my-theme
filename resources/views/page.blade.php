@extends('layouts.app')

@section('view-class', 'page')

@section('main')
	@while(have_posts()) @php(the_post())
		@include('partials.page-header')
		@includeFirst(['partials.content-page', 'partials.content'])
	@endwhile
@endsection
