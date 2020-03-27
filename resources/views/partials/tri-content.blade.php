<?
	$tri_content_id = "tri-content-1";
?>

<section class="tri-content">
	<span class="tri-content__ctr">
		<button id="{{$tri_content_id}}__back" class="tri-content__button"><</button>
		<span id="{{$tri_content_id}}__prev" class="tri-content__heading">Design</span>
		<h2 id="{{$tri_content_id}}__current" class="tri-content__heading">Development</h2>
		<span id="{{$tri_content_id}}__next" class="tri-content__heading">Marketing</span>
		<button id="{{$tri_content_id}}__frwd" class="tri-content__button">></button>
	</span>
	<div class="tri-content__content-area">
		<div id="{{$tri_content_id}}__left"
			class="tri-content__content tri-content__content--left">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
		<div id="{{$tri_content_id}}__right"
			class="tri-content__content tri-content__content--right">
			<img class="pfwds-towers__background" src="{{ get_template_directory_uri() . '/dist/images/passionfruit_towers.png' }}"/>
			<img class="pfwds-towers__icon pfwds-towers__icon--one" src="{{ get_template_directory_uri() . '/dist/images/at.png' }}"/>
			<img class="pfwds-towers__icon pfwds-towers__icon--two" src="{{ get_template_directory_uri() . '/dist/images/search.png' }}"/>
			<img class="pfwds-towers__icon pfwds-towers__icon--three" src="{{ get_template_directory_uri() . '/dist/images/share.png' }}"/>
		</div>
	</div>
</section>
