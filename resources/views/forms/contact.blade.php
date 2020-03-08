<?
	$form_id = 'contact-form-1';
	$class = [
		'contact-form__field'
	]
?>

<form class="contact-form"
	method="POST"
	id="contact-form-1"
	autocomplete="on">
	<div class="contact-form__main-wrapper">
		@include('components.form-field', [
			'class' => $class,
			'slug' => 'email',
			'type' => 'email',
			'autocomplete' => 'email',
			'label_text' => 'Email Address',
			'required' => true
		])
		<input id="contact-form-1__submit"
			class="contact-form__button button button--submit"
			type="submit"
			name="submit"
			value="Contact Us"
			disabled/>
	</div>
</form>

<template id="contact-form-1__remainder">
	@include('components.form-field', [
		'class' => array_merge($class, [ 'contact-form__field--animated' ]),
		'slug' => 'first_name',
		'label_text' => 'First Name',
		'autocomplete' => 'given-name',
		'required' => true
	])
	@include('components.form-field', [
		'class' => array_merge($class, [ 'contact-form__field--animated' ]),
		'slug' => 'last_name',
		'label_text' => 'Last Name',
		'autocomplete' => 'family-name',
		'required' => true
	])
	@include('components.form-field', [
		'class' => array_merge($class, [ 'contact-form__field--animated' ]),
		'slug' => 'organization',
		'label_text' => 'Organization',
		'autocomplete' => 'organization'
	])
	@include('components.form-field', [
		'class' => array_merge($class, [ 'contact-form__field--animated' ]),
		'slug' => 'organization_title',
		'label_text' => 'Job Title',
		'autocomplete' => 'organization-title'
	])
	<div class="contact-form__field contact-form__field--wide contact-form__field--animated form-field">
		<label class="form-field__label"
			for="contact-form-1__message">
			Message
		</label>
		<textarea id="contact-form-1__message"
			class="form-field__input form-field__input--message"
			name="message"
			spellcheck="true"
			placeholder="Message"
			rows=15
			required></textarea>
	</div>
</template>
