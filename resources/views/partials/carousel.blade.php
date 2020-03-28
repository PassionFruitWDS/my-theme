<?
	$carousel_id = "carousel-1";
?>

<section id="{{$carousel_id}}" class="carousel">
	<span class="carousel__ctr">
		<button id="{{$carousel_id}}__back" class="carousel__button"><</button>
		<span id="{{$carousel_id}}__prev" class="carousel__heading">Design</span>
		<h2 id="{{$carousel_id}}__current" class="carousel__heading carousel__heading--big">Development</h2>
		<span id="{{$carousel_id}}__next" class="carousel__heading">Marketing</span>
		<button id="{{$carousel_id}}__frwd" class="carousel__button">></button>
	</span>
	<div class="carousel__content-area">
		<div id="{{$carousel_id}}__content"
			class="carousel__content carousel__content--left">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
		<div id="{{$carousel_id}}__image"
			class="carousel__content carousel__content--right pfwds-towers">
			<img id="{{$carousel_id}}__background" class="pfwds-towers__background" src="{{ get_template_directory_uri() . '/dist/images/passionfruit_towers.png' }}"/>
			<img id="{{$carousel_id}}__icon--one" class="pfwds-towers__icon pfwds-towers__icon--one" src="{{ get_template_directory_uri() . '/dist/images/at.png' }}"/>
			<img id="{{$carousel_id}}__icon--two" class="pfwds-towers__icon pfwds-towers__icon--two" src="{{ get_template_directory_uri() . '/dist/images/search.png' }}"/>
			<img id="{{$carousel_id}}__icon--three" class="pfwds-towers__icon pfwds-towers__icon--three" src="{{ get_template_directory_uri() . '/dist/images/share.png' }}"/>
		</div>
	</div>
</section>
