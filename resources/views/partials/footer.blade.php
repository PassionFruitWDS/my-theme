<footer class="footer">
	<img class="footer__brand"
		loading="lazy"
		srcset="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.webp' }} 279w,
			{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.webp' }} 557w"
		sizes="(max-width: 576px): 279px,
			557px"
		src="{{ get_template_directory_uri() . '/dist/images/pfwds-logo--small.webp' }}"
		width="557px"
		alt="PassionFruit Web Development Studio"/>
	<div class="footer__legal">
		<div class="footer__cw">
			PassionFruit Web Development Studio LLC - &#x00a9 2020
		</div>
		<div id="terms-link" class="footer__terms-link">
			<span>
				Terms
			</span>
		</div>
	</div>
</footer>

<template id="terms-template">
	<div id="terms" class="terms">
		<div class="terms__inner">
			<button class="terms__close" type="button">
				&#x00d7
			</button>
			<h1>Terms and Conditions ("Terms")</h1>
			<p>Last updated: March 29th, 2020</p>
			<p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.passionfruitwebdev.com website operated by PassionFruit Web Development Studio LLC ("us", "we", or "our").</p>
			<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
			<p><em>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</em><p>
			<h2>Links To Other Web Sites</h2>
			<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by PassionFruit Web Development Studio LLC.</p>
			<p>PassionFruit Web Development Studio LLC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that PassionFruit Web Development Studio LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
			<h2>Changes</h2>
			<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
			<h2>Contact Us</h2>
			<p>If you have any questions about these Terms, please contact us.</p>
		</div>
	</div>
</template>
