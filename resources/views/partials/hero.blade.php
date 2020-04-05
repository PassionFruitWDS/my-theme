<section id="home__hero" class="hero">
	<div id="home__hero--brand-container" class="hero__brand-container">
		<img id="home__hero--brand-image" class="hero__brand"
			src="{{ get_template_directory_uri() . '/dist/images/pfwds_logo.png' }}"
			alt="PassionFruit Web Development Studio"/>
	</div>
	<div id="home__hero--feature-container" class="hero__feature-container">
		<div id="home__hero--feature" class="hero__feature">
			<h1>Bring your passion for your business online</h1>
			<p>
				You deserve to have your business's digital identity reflect the heart and soul you bring to it. Part web development outlet, part digital marketing firm, <em>PassionFruit Web Development Studio</em> offers solutions for businesses and owners looking to bring their brand to the next level. To learn more about how PassionFruit can help you, <em>reach out now</em> to recieve a free consultation or continue reading below.
			</p>
		</div>
	</div>
	@include('forms.contact')
</section>
