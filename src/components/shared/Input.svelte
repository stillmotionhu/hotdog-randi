<script lang="ts">
	import type { AutocompleteType } from '@/types/autocomplete-type';
	import type { InputType } from '@/types/input-type';

	interface InputProps {
		type: InputType;
		name: string;
		placeholder: string;
		autocomplete?: AutocompleteType;
		maxlength?: number;
		required?: boolean;
		value: string | null;
		hasError?: boolean;
	}

	let {
		type,
		name,
		placeholder,
		autocomplete = 'off',
		maxlength,
		required = false,
		value = $bindable<string | null>(''),
		hasError = $bindable<boolean>(false)
	}: InputProps = $props();
</script>

<div class="input" data-required={required} data-has-error={hasError}>
	<input
		class="input__field"
		{type}
		id={name}
		{placeholder}
		{autocomplete}
		{maxlength}
		bind:value
	/>
	<label class="input__label" for={name}>{placeholder}</label>
</div>

<style lang="scss">
	.input {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 60px;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 0px 32px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1),
			inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(5px);
		transition: transform 0.35s cubic-bezier(0.44, 1.14, 0.43, 1.32);

		&:has(.input__field:focus) {
			transform: scale(0.95);
			transition: transform 0.45s cubic-bezier(0.44, 1.14, 0.43, 1.32);
		}

		&__field {
			font-size: 1em;
			color: rgb(var(--fg));
			width: 100%;
			height: 60px;
			padding: 15px 25px;
			border-radius: 30px;
			background-color: transparent;
			outline: none;

			&:-webkit-autofill {
				&,
				&:hover,
				&:focus {
					-webkit-text-fill-color: rgb(var(--fg));
					transition: background-color 5000s;
				}
			}

			&::placeholder {
				visibility: hidden;
			}
		}

		&__label {
			position: absolute;
			top: 7px;
			left: 1px;
			font-size: 1em;
			font-weight: 500;
			color: rgb(100, 100, 100);
			padding: 15px 25px;
			cursor: text;

			.input__field:not(:placeholder-shown) ~ & {
				visibility: hidden;
			}
		}
	}
</style>
