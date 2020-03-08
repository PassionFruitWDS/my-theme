<? $input_id = "${form_id}__${slug}"; ?>

<div class="{{ implode(' ', $class) }} form-field">
	<label class="form-field__label"
		for="{{ $input_id }}">
		{{ $label_text }}
	</label>
	<input id="{{ $input_id }}"
		form="{{ $form_id }}"
		class="form-field__input form-field__input--{{ $slug }}"
		name="{{ $slug }}"
		placeholder="{{ $label_text }}"

		{{-- required (boolean attr -> presence implies true --}}
		@isset($required)
			required
		@endisset

		{{-- autocomplete type --}}
		@isset($autocomplete)
			autocomplete="{{ $autocomplete }}"
		@endisset

		{{-- input type (default: text) --}}
		<?$render_type = 'text';?>
		@isset($type)
			<?$render_type = $type?>
		@endisset
		type="{{ $render_type }}"

		{{-- additional attributes --}}
		@isset($attributes)
			{{ implode(' ', $attributes) }}
		@endisset
		/>
</div>
