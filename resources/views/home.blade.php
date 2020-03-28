@extends('layouts.app')

@section('content-classes', 'homepage-content')

@section('content')
	@include('partials.hero')
	<main class="content">
		@include('partials.carousel')
	</main>
@endsection
