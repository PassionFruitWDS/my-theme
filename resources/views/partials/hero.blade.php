<section id="home__hero" class="hero">
	<div id="home__hero--brand-container" class="hero__brand-container">
		<picture>
			<source srcset="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--medium.webp' }} 1045w,
				{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.webp' }} 557w"
				type="image/webp" >
			<source srcset="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--medium.jp2' }} 1045w,
				{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.jp2' }} 557w"
				type="image/jp2" >
			<source srcset="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--medium.png' }} 1045w,
				{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.png' }} 557w"
				type="image/png" >
			<img id="home__hero--brand-image"
				class="hero__brand"
				sizes="(max-width: 576px) 557px,
					1045px"
				src="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--medium.png' }}"
				width="1045px"
				alt="A fresh passion fruit, cut in half, next to the words 'PassionFruit Web Development Studio'"/>
		</picture>
	</div>
	<div id="home__hero--feature-container" class="hero__feature-container">
		<div id="home__hero--feature" class="hero__feature">
			<h1>Bring your passion for your business online</h1>
			<p>
				You deserve to have your business's digital identity reflect the heart and soul you bring to it. Part web development outlet, part digital marketing firm, <em>PassionFruit Web Development Studio</em> offers solutions for businesses and owners looking to bring their brand to the next level. To learn more about how PassionFruit can help you, <a href="#contact-form-1__email"><em>reach out now</em></a> to recieve a free consultation or continue reading below.
			</p>
		</div>
	</div>
	@include('forms.contact')
</section>
