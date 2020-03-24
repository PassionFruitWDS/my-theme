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
			<h2>Your partner in growth for the digital age.</h2>
			<p>
				Web pressence has never been as <em>vital for success in business</em> as it is now. Part web development outlet, part digital marketing firm, <em>PassionFruit stands ready</em> to deliver a wide range of services and solutions to <em class="heavy">meet your business' needs</em>.
			</p>
		</div>
	</div>
	@include('forms.contact')
</section>
