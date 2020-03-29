@extends('layouts.app')

@section('content-classes', 'homepage-content')

@section('content')
	@include('partials.hero')
	<div class="content">
		@include('partials.carousel')
		@include('partials.card-table')
	</div>
@endsection
