/**
 * External Dependencies
 */
import 'jquery';
import 'bootstrap';

$(document).ready(() => {
	const hamburger = $('.hamburger');
	const nav = $('.nav');
	$('.hamburger').on('click', (event) => {
		hamburger.toggleClass('is-active');
		nav.toggleClass('is-active');
	});
});
