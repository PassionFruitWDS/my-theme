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
			<h1>Bring your passion for your business online</h1>
			<p>
				You deserve to have your business's digital identity reflect the heart and soul you bring to it. Part web development outlet, part digital marketing firm, <em>PassionFruit Web Development Studio</em> offers solutions for businesses and owners looking to bring their brand to the next level. To learn more about how PassionFruit can help you, <em>reach out now</em> to recieve a free consultation or continue reading below.
			</p>
		</div>
	</div>
	@include('forms.contact')
</section>
