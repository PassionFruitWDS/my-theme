<section class="hero">
	<div class="hero__background"
		style="background-image: url({{ get_template_directory_uri() . '/dist/images/hero.jpg' }})">
	</div>
	<div class="hero__brand-grid">
		<div class="hero__brand-surface"></div>
		<img class="hero__brand-image"
			src="{{ get_template_directory_uri() . '/dist/images/pfwds_logo.png' }}"
			alt="PassionFruit Web Development Studio"/>
	</div>
	<div class="hero__feature-grid">
		<div class="hero__feature-surface"></div>
		<div class="hero__feature">
			<h2>Your business, your passion...</h2>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
			</p>
		</div>
	</div>
	@include('forms.contact')
</section>
